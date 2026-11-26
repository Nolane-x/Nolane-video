from manim import (
    Arrow,
    Create,
    DashedLine,
    Dot,
    FadeIn,
    GrowArrow,
    Line,
    Rectangle,
    Scene,
    Text,
    VGroup,
    Write,
)
import json
import math
from pathlib import Path
import numpy as np


INK = "#101B26"
SLATE = "#203746"
IVORY = "#F4EDE0"
WATER = "#9AD8D7"
RAY = "#FFD36A"
GUIDE = "#E7E7E1"
SECONDARY = "#A9B6BE"
CORAL = "#E47D68"
MINT = "#8ED2B0"
FONT = "DejaVu Sans"


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

        self.camera.background_color = INK
        boundary_y = 0.55

        # Establish the same visual world as the other benchmark candidate from
        # frame zero: deep ink air above a slate/teal water volume.
        water_region = Rectangle(
            width=13.6,
            height=4.45,
            stroke_width=0,
            fill_color=SLATE,
            fill_opacity=1,
        ).move_to([0, -1.675, 0])
        self.add(water_region)

        interface = Line(
            np.array([-6.8, boundary_y, 0]),
            np.array([6.8, boundary_y, 0]),
            color=WATER,
            stroke_width=5,
        )
        water_label = Text(
            "NƯỚC", font=FONT, font_size=30, color=WATER
        ).move_to([-5.2, -2.45, 0])
        air_label = Text(
            "KHÔNG KHÍ", font=FONT, font_size=30, color=IVORY
        ).move_to([-5.0, 2.7, 0])

        interface_point = np.array([0.0, boundary_y, 0])

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
            interface_point + np.array([0, -3.0, 0]),
            interface_point + np.array([0, 3.0, 0]),
            color=GUIDE,
            stroke_width=3,
            dash_length=0.12,
        )
        incident = Arrow(
            true_point,
            interface_point,
            buff=0,
            color=RAY,
            stroke_width=7,
            max_tip_length_to_length_ratio=0.08,
        )
        refracted = Arrow(
            interface_point,
            eye,
            buff=0,
            color=RAY,
            stroke_width=7,
            max_tip_length_to_length_ratio=0.08,
        )
        backward = DashedLine(
            interface_point,
            apparent_point,
            color=IVORY,
            stroke_width=4,
            dash_length=0.16,
        )

        true_dot = Dot(true_point, radius=0.10, color=CORAL)
        apparent_dot = Dot(apparent_point, radius=0.10, color=MINT)
        eye_dot = Dot(eye, radius=0.12, color=IVORY)

        normal_label = Text(
            "PHÁP TUYẾN", font=FONT, font_size=22, color=SECONDARY
        ).move_to([-1.9, 2.05, 0])
        water_angle = Text(
            "40°", font=FONT, font_size=30, color=RAY
        ).move_to([-1.5, -0.7, 0])
        air_angle = Text(
            "58,9°", font=FONT, font_size=30, color=RAY
        ).move_to([1.0, 1.55, 0])
        true_label = Text(
            "Vị trí thật", font=FONT, font_size=25, color=CORAL
        ).move_to([-1.65, -3.55, 0])
        apparent_label = Text(
            "Vị trí biểu kiến", font=FONT, font_size=23, color=MINT
        ).move_to([-4.25, -1.65, 0])
        eye_label = Text(
            "Mắt", font=FONT, font_size=25, color=IVORY
        ).next_to(eye_dot, Arrow(RIGHT=[1, 0, 0]).get_unit_vector(), buff=0.15)

        title = Text(
            "ÁNH SÁNG KHÚC XẠ", font=FONT, font_size=38, color=IVORY
        ).to_edge([0, 1, 0])
        formula = Text(
            "n₁ sin θ₁ = n₂ sin θ₂",
            font=FONT,
            font_size=34,
            color=IVORY,
        ).move_to([3.55, -2.75, 0])
        indices = Text(
            "nước: 1,333   |   không khí: 1,0003",
            font=FONT,
            font_size=22,
            color=SECONDARY,
        ).next_to(formula, [0, -1, 0], buff=0.22)

        self.play(Write(title), FadeIn(water_label), FadeIn(air_label), run_time=1.4)
        self.play(
            Create(interface),
            Create(normal),
            FadeIn(normal_label),
            run_time=1.2,
        )
        self.play(GrowArrow(incident), FadeIn(true_dot), run_time=1.4)
        self.play(
            GrowArrow(refracted),
            FadeIn(eye_dot),
            FadeIn(eye_label),
            run_time=1.3,
        )
        self.play(
            FadeIn(water_angle),
            FadeIn(air_angle),
            Write(formula),
            FadeIn(indices),
            run_time=1.6,
        )
        self.wait(1.2)
        self.play(
            Create(backward),
            FadeIn(apparent_dot),
            FadeIn(apparent_label),
            FadeIn(true_label),
            run_time=1.4,
        )
        self.wait(2.0)

        # Keep the numerical result inspectable in the render log for QA.
        print(f"SNELL theta_water={theta_water_deg:.1f} theta_air={theta_air_deg:.3f}")
