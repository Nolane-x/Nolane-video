from manim import (
    BLUE_D,
    Create,
    DashedLine,
    Dot,
    FadeIn,
    GOLD,
    LEFT,
    RIGHT,
    UP,
    DOWN,
    GrowArrow,
    Line,
    Scene,
    Text,
    VGroup,
    WHITE,
    Write,
    Arrow,
)
import json
import math
from pathlib import Path
import numpy as np


class RefractionSegment(Scene):
    """S04-S05: correct water-to-air refraction and apparent image position."""

    def construct(self):
        geometry_path = Path(__file__).resolve().parents[1] / "shared" / "diagram.json"
        geometry = json.loads(geometry_path.read_text(encoding="utf-8"))
        n_water = geometry["water_refractive_index"]
        n_air = geometry["air_refractive_index"]
        theta_water_deg = geometry["incident_angle_from_normal_deg"]
        theta_air_deg = math.degrees(
            math.asin((n_water / n_air) * math.sin(math.radians(theta_water_deg)))
        )

        boundary_y = 0.55
        interface = Line(
            np.array([-6.8, boundary_y, 0]),
            np.array([6.8, boundary_y, 0]),
            color=WHITE,
            stroke_width=5,
        )
        water_region = VGroup()
        water_label = Text("NƯỚC", font_size=30, color=BLUE_D).move_to([-5.2, -2.45, 0])
        air_label = Text("KHÔNG KHÍ", font_size=30, color=WHITE).move_to([-5.0, 2.7, 0])

        point = np.array([0.0, boundary_y, 0])

        def to_manim(point_px):
            return np.array([
                (point_px["x"] - geometry["interface"]["x"]) / 120,
                boundary_y + (geometry["interface"]["y"] - point_px["y"]) / 120,
                0,
            ])

        true_point = to_manim(geometry["incident_point"])
        apparent_point = to_manim(geometry["apparent_point"])
        eye = to_manim(geometry["observer_point"])

        normal = DashedLine(
            point + np.array([0, -3.0, 0]),
            point + np.array([0, 3.0, 0]),
            color=WHITE,
            stroke_width=3,
            dash_length=0.12,
        )
        incident = Arrow(true_point, point, buff=0, color=GOLD, stroke_width=7, max_tip_length_to_length_ratio=0.08)
        refracted = Arrow(point, eye, buff=0, color=GOLD, stroke_width=7, max_tip_length_to_length_ratio=0.08)
        backward = DashedLine(
            point,
            apparent_point,
            color=WHITE,
            stroke_width=4,
            dash_length=0.16,
        )

        true_dot = Dot(true_point, radius=0.10, color="#E47D68")
        apparent_dot = Dot(apparent_point, radius=0.10, color="#8ED2B0")
        eye_dot = Dot(eye, radius=0.12, color=WHITE)

        normal_label = Text("PHÁP TUYẾN", font_size=22, color=WHITE).move_to([1.45, 1.85, 0])
        water_angle = Text("40°", font_size=30, color=GOLD).move_to([-1.5, -0.7, 0])
        air_angle = Text("58,9°", font_size=30, color=GOLD).move_to([1.0, 1.55, 0])
        true_label = Text("Vị trí thật", font_size=25, color="#E47D68").move_to([-1.65, -3.55, 0])
        apparent_label = Text("Vị trí biểu kiến", font_size=25, color="#8ED2B0").move_to([-1.55, -1.45, 0])
        eye_label = Text("Mắt", font_size=25, color=WHITE).next_to(eye_dot, RIGHT, buff=0.15)

        title = Text("ÁNH SÁNG KHÚC XẠ", font_size=38, color=WHITE).to_edge(UP)
        formula = Text(
            "n₁ sin θ₁ = n₂ sin θ₂",
            font_size=34,
            color=WHITE,
        ).move_to([3.55, -2.75, 0])
        indices = Text(
            "nước: 1,333   |   không khí: 1,0003",
            font_size=22,
            color="#A9B6BE",
        ).next_to(formula, DOWN, buff=0.22)

        self.play(Write(title), FadeIn(water_label), FadeIn(air_label), run_time=1.4)
        self.play(Create(interface), Create(normal), FadeIn(normal_label), run_time=1.2)
        self.play(GrowArrow(incident), FadeIn(true_dot), run_time=1.4)
        self.play(GrowArrow(refracted), FadeIn(eye_dot), FadeIn(eye_label), run_time=1.3)
        self.play(FadeIn(water_angle), FadeIn(air_angle), Write(formula), FadeIn(indices), run_time=1.6)
        self.wait(1.2)
        self.play(Create(backward), FadeIn(apparent_dot), FadeIn(apparent_label), FadeIn(true_label), run_time=1.4)
        self.wait(2.0)

        # Keep the numerical result inspectable in the render log for the QA report.
        print(f"SNELL theta_water={theta_water_deg:.1f} theta_air={theta_air_deg:.3f}")
