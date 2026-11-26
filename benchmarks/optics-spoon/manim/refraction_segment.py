from manim import (
    BLUE_D,
    Create,
    DashedLine,
    Dot,
    FadeIn,
    GOLD,
    GrowArrow,
    Line,
    Scene,
    Text,
    VGroup,
    WHITE,
    Write,
    Arrow,
)
import math
import numpy as np


class RefractionSegment(Scene):
    """S04-S05: correct water-to-air refraction and apparent image position."""

    def construct(self):
        n_water = 1.333
        n_air = 1.0003
        theta_water_deg = 40.0
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
        water_label = Text("NƯỚC", font_size=30, color=BLUE_D).move_to([-5.1, -2.8, 0])
        air_label = Text("KHÔNG KHÍ", font_size=30, color=WHITE).move_to([-5.0, 2.7, 0])

        point = np.array([0.0, boundary_y, 0])
        theta_w = math.radians(theta_water_deg)
        theta_a = math.radians(theta_air_deg)

        true_point = np.array([-3.2, boundary_y - 3.2 / math.tan(theta_w), 0])
        apparent_point = np.array([-3.2, boundary_y - 3.2 / math.tan(theta_a), 0])
        eye = np.array([3.2, boundary_y + 3.2 / math.tan(theta_a), 0])

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

        normal_label = Text("PHÁP TUYẾN", font_size=24, color=WHITE).next_to(normal, RIGHT, buff=0.15)
        water_angle = Text("40°", font_size=30, color=GOLD).move_to([-1.5, -0.7, 0])
        air_angle = Text("58,9°", font_size=30, color=GOLD).move_to([1.0, 1.55, 0])
        true_label = Text("Vị trí thật", font_size=25, color="#E47D68").next_to(true_dot, DOWN, buff=0.15)
        apparent_label = Text("Vị trí biểu kiến", font_size=25, color="#8ED2B0").next_to(apparent_dot, UP, buff=0.15)
        eye_label = Text("Mắt", font_size=25, color=WHITE).next_to(eye_dot, RIGHT, buff=0.15)

        title = Text("ÁNH SÁNG KHÚC XẠ", font_size=38, color=WHITE).to_edge(UP)
        formula = Text(
            "n_nước sin(theta_nước) = n_không_khí sin(theta_không_khí)",
            font_size=24,
            color=WHITE,
        ).to_edge(DOWN, buff=0.48)
        indices = Text("n_nước ≈ 1,333     n_không_khí ≈ 1,0003", font_size=22, color="#A9B6BE").next_to(formula, UP, buff=0.22)

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
