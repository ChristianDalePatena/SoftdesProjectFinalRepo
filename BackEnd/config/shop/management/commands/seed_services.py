from django.core.management.base import BaseCommand
from shop.models import Category, Service


class Command(BaseCommand):
    help = "Seed database with all 27 printing services"

    def add_arguments(self, parser):
        parser.add_argument(
            '--update',
            action='store_true',
            help='Update existing services instead of clearing all',
        )

    def handle(self, *args, **kwargs):
        update_mode = kwargs['update']

        if not update_mode:
            Service.objects.all().delete()
            Category.objects.all().delete()
            self.stdout.write("Cleared existing services and categories.")

        # ── Categories ───────────────────────────────────
        categories_data = [
            {"name": "Apparel & Signage",  "slug": "cat-1", "order": 1},
            {"name": "Stickers & ID",      "slug": "cat-2", "order": 2},
            {"name": "Print Materials",    "slug": "cat-3", "order": 3},
            {"name": "Novelty Items",      "slug": "cat-4", "order": 4},
            {"name": "Specialty Prints",   "slug": "cat-5", "order": 5},
        ]

        cat_objs = {}
        for cat in categories_data:
            obj, _ = Category.objects.get_or_create(
                slug=cat["slug"],
                defaults={"name": cat["name"], "order": cat["order"]}
            )
            cat_objs[cat["slug"]] = obj
            self.stdout.write(f"  Category: {cat['name']}")

        # ── Services ─────────────────────────────────────
        services = [

            # ════════════════════════════════════════════
            # CATEGORY 1 — Apparel & Signage
            # ════════════════════════════════════════════
            {
                "category": cat_objs["cat-1"],
                "name": "Mug", "slug": "mug",
                "base_price": 120.00,
                "is_available": True,
                "description": "Custom printed mugs for personal or promotional use.",
                "options_schema": {
                    "types": [
                        "Classic White Mug",
                        "Magic Mug (Heat-sensitive)",
                        "Glass Mug",
                        "Colored Mug (inside handle color)"
                    ],
                    "print_areas":  ["Front Only", "Full Wrap", "Front & Back"],
                    "design_sizes": ["Small Logo", "Medium", "Full Wrap"],
                    "orientations": ["Landscape", "Portrait"],
                    "font_styles":  ["Sans", "Serif", "Script"],
                    "extras": {
                        "magic_mug_extra": 50,
                        "box_extra": 20
                    }
                }
            },
            {
                "category": cat_objs["cat-1"],
                "name": "Sintra Board", "slug": "sintra",
                "base_price": 120.00,
                "is_available": True,
                "description": "Lightweight PVC foam board for indoor signage.",
                "options_schema": {
                    "units":        ["inches", "feet"],
                    "presets":      ["12×18 in", "18×24 in", "24×36 in", "Custom"],
                    "thickness":    ["3mm", "5mm", "10mm"],
                    "finishes":     ["Matte", "Glossy"],
                    "print_types":  ["Single-sided", "Double-sided"],
                    "laminations":  ["None", "Matte", "Glossy"],
                    "usages":       ["Business Signage", "Event Display", "Directional Sign", "Others"],
                    "extras": {
                        "thickness_5mm_per_sqft":       30,
                        "thickness_10mm_per_sqft":      60,
                        "double_sided_per_sqft":        50,
                        "lamination_per_sqft":          20,
                        "stand":                        150,
                    }
                }
            },
            {
                "category": cat_objs["cat-1"],
                "name": "Sticker", "slug": "sticker",
                "base_price": 5.00,
                "is_available": True,
                "description": "Custom stickers in various shapes and sizes.",
                "options_schema": {
                    "sticker_types":  ["Matte Sticker", "Glossy Sticker", "Transparent Sticker", "Holographic Sticker"],
                    "size_units":     ["cm", "inches"],
                    "presets":        ["2×2", "3×3", "4×4", "Custom"],
                    "shapes":         ["Square", "Circle", "Rectangle", "Custom Die-Cut"],
                    "cutting_types":  ["Kiss Cut", "Die Cut", "Sheet Cut"],
                    "laminations":    ["None", "Matte Lamination", "Glossy Lamination"],
                    "extras": {
                        "waterproof_per_pc":         1,
                        "uv_resistant_per_pc":       1,
                        "matte_lamination_per_pc":   2,
                        "glossy_lamination_per_pc":  2,
                    }
                }
            },
            {
                "category": cat_objs["cat-1"],
                "name": "T-Shirt", "slug": "t-shirt",
                "base_price": 150.00,
                "is_available": True,
                "description": "Custom printed t-shirts for events and uniforms.",
                "options_schema": {
                    "types":       ["Round Neck", "V-Neck", "Polo", "Oversized"],
                    "placements":  ["Front", "Back", "Both"],
                    "print_sizes": ["Small", "Medium", "Large"],
                    "methods":     ["Screen Print", "Heat Press", "DTG"],
                    "sizes":       ["XS", "S", "M", "L", "XL", "XXL"],
                    "extras": {
                        "heat_press_per_pc": 30,
                        "dtg_per_pc":        70,
                    }
                }
            },
            {
                "category": cat_objs["cat-1"],
                "name": "Tarpaulin", "slug": "tarpaulin",
                "base_price": 35.00,
                "is_available": True,
                "description": "Large format tarpaulin printing for events and promotions.",
                "options_schema": {
                    "presets":    ["2×3 ft", "3×5 ft", "4×6 ft", "5×8 ft", "Custom"],
                    "materials":  ["Standard Tarpaulin", "Matte Finish", "Glossy Finish"],
                    "thickness":  ["10oz", "13oz", "15oz", "18oz"],
                    "usages":     ["Event Banner", "Business Advertisement", "Birthday / Celebration", "Others"],
                    "price_per":  "sqft",
                    "extras": {
                        "eyelets": 20,
                        "rope":    30,
                        "stand":   150,
                    }
                }
            },
            {
                "category": cat_objs["cat-1"],
                "name": "Cap", "slug": "cap",
                "base_price": 250.00,
                "is_available": True,
                "description": "Custom printed caps for events and promotions.",
                "options_schema": {
                    "needs_design": ["Yes", "No"],
                    "extras": {}
                }         # ← Will update when team finishes
            },

            # ════════════════════════════════════════════
            # CATEGORY 2 — Stickers & ID
            # ════════════════════════════════════════════
            {
                "category": cat_objs["cat-2"],
                "name": "Pull-Up Banner", "slug": "banner",
                "base_price": 1200.00,
                "is_available": True,
                "description": "Retractable pull-up banners for events and displays.",
                "options_schema": {
                    "sizes":        ["Standard (2ft × 5ft)", "Premium (2.5ft × 6ft)", "Deluxe (3ft × 6.5ft)"],
                    "materials":    ["Matte Tarpaulin", "Glossy Tarpaulin", "Premium Film"],
                    "qualities":    ["Standard", "High Resolution"],
                    "stand_types":  ["Standard Roll-up Stand", "Heavy Duty Stand"],
                    "replace_only": ["Full Set", "Print Only"],
                    "extras": {
                        "premium_size":     600,
                        "deluxe_size":      1300,
                        "heavy_duty_stand": 500,
                        "carrying_case":    200,
                        "extra_stand":      800,
                    }
                }
            },
            {
                "category": cat_objs["cat-2"],
                "name": "Frosted Sticker", "slug": "frosted",
                "base_price": 80.00,
                "is_available": True,
                "description": "Frosted vinyl stickers for glass and windows.",
                "options_schema": {
                    "units":          ["in", "cm"],
                    "presets":        ["12×12", "24×24", "24×36", "Custom"],
                    "frost_types":    ["Standard Frosted", "Sandblast Effect", "Gradient Frost (Top to Bottom)"],
                    "opacities":      ["Light (30%)", "Medium (50%)", "Heavy (70%)"],
                    "shapes":         ["Square / Rectangle", "Circle", "Custom Die-Cut"],
                    "cutting_types":  ["Kiss Cut", "Die Cut"],
                    "usages":         ["Office Glass", "Storefront", "Bathroom / Privacy", "Decorative", "Others"],
                    "price_per":      "sqft",
                    "extras": {
                        "gradient_frost_per_sqft": 20,
                        "die_cut_per_pc":          15,
                        "installation":            200,
                        "transfer_tape":           50,
                    }
                }
            },
            {
                "category": cat_objs["cat-2"],
                "name": "Lanyard", "slug": "lanyard",
                "base_price": 35.00,
                "is_available": True,
                "description": "Custom printed lanyards for IDs and events.",
                "options_schema": {
                    "lanyard_types": [
                        "1 inch Polyester",
                        "3/4 inch Polyester",
                        "1/2 inch Polyester",
                        "1 inch Cotton",
                        "3/4 inch Cotton",
                        "1 inch Satin",
                        "3/4 inch Satin"
                    ],
                    "extras": {
                        "1_inch_polyester":    30,
                        "3/4_inch_polyester":  10,
                        "1_inch_cotton":       45,
                        "3/4_inch_cotton":     25,
                        "1_inch_satin":        50,
                        "3/4_inch_satin":      30,
                    }
                }         # ← Will update when team finishes
            },
            {
                "category": cat_objs["cat-2"],
                "name": "Photocopy", "slug": "photocopy",
                "base_price": 1.00,
                "is_available": True,
                "description": "Black and white or colored photocopying services.",
                "options_schema": {
                    "paper_sizes":   ["Short (8.5x11)", "A4", "Long (8.5x13)", "A3"],
                    "paper_types":   ["Regular 70gsm", "Premium 80gsm", "Cardstock (White)"],
                    "color_modes":   ["Black & White", "Full Color"],
                    "sides":         ["Single-sided", "Back-to-Back"],
                    "extras": {
                        "a3_extra":         4,
                        "full_color_extra": 4,
                    }
                }
            },
            {
                "category": cat_objs["cat-2"],
                "name": "PVC ID Card", "slug": "pvc",
                "base_price": 50.00,
                "is_available": True,
                "description": "Durable PVC ID cards for employees and students.",
                "options_schema": {
                    "id_types":     ["School ID", "Company ID", "Event ID", "Custom ID"],
                    "orientations": ["Portrait", "Landscape"],
                    "card_sizes":   ["Standard CR80", "Custom size"],
                    "finishes":     ["Glossy", "Matte"],
                    "thickness":    ["Standard (0.76mm)", "Thick (1mm)"],
                    "bulk_modes":   ["Single ID", "Bulk Upload"],
                    "extras": {
                        "matte_finish_per_pc":  5,
                        "thick_per_pc":         10,
                        "lanyard_per_pc":       20,
                        "id_holder_per_pc":     15,
                        "qr_code_per_pc":       5,
                    }
                }
            },
            {
                "category": cat_objs["cat-2"],
                "name": "Transparent Sticker", "slug": "transparent",
                "base_price": 8.00,
                "is_available": True,
                "description": "See-through stickers for product labels and branding.",
                "options_schema": {
                    "units":          ["in", "cm"],
                    "presets":        ["2×2", "3×3", "4×4", "Custom"],
                    "materials":      ["Clear Glossy", "Clear Matte"],
                    "white_inks":     ["None (fully transparent)", "Partial White (for selected areas)", "Full White Backing"],
                    "opacities":      ["Fully Transparent", "Semi-Transparent", "Solid Look (with white backing)"],
                    "shapes":         ["Square / Rectangle", "Circle", "Custom Die-Cut"],
                    "cutting_types":  ["Kiss Cut", "Die Cut", "Sheet Cut"],
                    "laminations":    ["None", "Glossy Lamination", "Matte Lamination"],
                    "surfaces":       ["Glass", "Plastic", "Packaging", "Others"],
                    "extras": {
                        "partial_white_per_pc":      2,
                        "full_white_backing_per_pc": 3,
                        "waterproof_per_pc":         1,
                        "uv_resistant_per_pc":       1,
                        "glossy_lam_per_pc":         2,
                        "matte_lam_per_pc":          2,
                        "die_cut_per_pc":            3,
                    }
                }
            },

            # ════════════════════════════════════════════
            # CATEGORY 3 — Print Materials
            # ════════════════════════════════════════════
            {
                "category": cat_objs["cat-3"],
                "name": "Button Pin", "slug": "button",
                "base_price": 10.00,
                "is_available": True,
                "description": "Custom button pins for events and promotions.",
                "options_schema": {
                    "button_types":  ["Pin Button", "Magnetic Button", "Keychain Button", "Mirror Button"],
                    "shapes":        ["Circle", "Square", "Rectangle"],
                    "sizes":         ["25mm", "32mm", "44mm", "58mm", "Custom"],
                    "finishes":      ["Glossy", "Matte"],
                    "backings":      ["Safety Pin", "Magnet", "Plastic Clip"],
                    "design_modes":  ["upload", "text"],
                    "font_styles":   ["Sans-Serif Bold", "Serif Classic", "Script / Cursive", "Condensed", "Rounded"],
                    "extras": {
                        "matte_finish_per_pc":   2,
                        "large_size_per_pc":     3,
                        "magnet_backing_per_pc": 5,
                        "plastic_pkg_per_pc":    2,
                        "back_card_per_pc":      3,
                        "waterproof_per_pc":     2,
                        "glitter_per_pc":        4,
                    }
                }
            },
            {
                "category": cat_objs["cat-3"],
                "name": "Flyers", "slug": "flyers",
                "base_price": 5.00,
                "is_available": True,
                "description": "Single or double-sided flyers for promotions.",
                "options_schema": {
                    "sizes":          ["A6 (105 × 148 mm)", "A5 (148 × 210 mm)", "A4 (210 × 297 mm)", "Letter (8.5 × 11 in)", "Custom"],
                    "orientations":   ["Portrait", "Landscape"],
                    "sides":          ["Single-sided", "Double-sided"],
                    "paper_types":    ["Glossy Paper", "Matte Paper", "Cardstock", "Recycled Paper"],
                    "paper_weights":  ["90 gsm", "120 gsm", "150 gsm", "200 gsm", "250 gsm"],
                    "finishes":       ["Glossy", "Matte", "No coating"],
                    "design_modes":   ["upload", "design"],
                    "foldings":       ["None", "Bi-fold", "Tri-fold"],
                    "extras": {
                        "double_sided":          2,
                        "paper_200gsm":          2,
                        "paper_250gsm":          2,
                        "glossy_finish":         1,
                        "matte_finish":          1,
                        "bifold":                2,
                        "trifold":               2,
                        "uv_coating_per_pc":     2,
                        "lamination_per_pc":     3,
                        "rounded_corners_per_pc":1,
                        "express_per_pc":        3,
                    }
                }
            },
            {
                "category": cat_objs["cat-3"],
                "name": "Label", "slug": "label",
                "base_price": 5.00,
                "is_available": True,
                "description": "Custom product labels and sticker labels.",
                "options_schema": {
                    "sizes":          ["A6 (105 × 148 mm)", "A5 (148 × 210 mm)", "A4 (210 × 297 mm)", "Letter (8.5 × 11 in)", "Custom"],
                    "orientations":   ["Portrait", "Landscape"],
                    "sides":          ["Single-sided", "Double-sided"],
                    "paper_types":    ["Glossy Paper", "Matte Paper", "Cardstock", "Recycled Paper"],
                    "paper_weights":  ["90 gsm", "120 gsm", "150 gsm", "200 gsm", "250 gsm"],
                    "finishes":       ["Glossy", "Matte", "No coating"],
                    "design_modes":   ["upload", "design"],
                    "foldings":       ["None", "Bi-fold", "Tri-fold"],
                    "extras": {
                        "double_sided":           2,
                        "paper_200gsm":           2,
                        "paper_250gsm":           2,
                        "glossy_finish":          1,
                        "matte_finish":           1,
                        "bifold":                 2,
                        "trifold":                2,
                        "uv_coating_per_pc":      2,
                        "lamination_per_pc":      3,
                        "rounded_corners_per_pc": 1,
                        "express_per_pc":         3,
                    }
                }
            },
            {
                "category": cat_objs["cat-3"],
                "name": "Leaflets", "slug": "leaflets",
                "base_price": 5.00,
                "is_available": True,
                "description": "Folded leaflets for brochures and catalogs.",
                "options_schema": {
                    "units":          ["in", "cm"],
                    "size_presets":   ["A5", "A4", "Letter", "Custom"],
                    "paper_types":    ["Matte Paper", "Glossy Paper", "Art Paper", "Cardstock"],
                    "paper_gsm":      ["120 GSM", "150 GSM", "170 GSM", "220 GSM"],
                    "print_types":    ["Black & White", "Full Color"],
                    "sides":          ["Single-sided", "Double-sided"],
                    "fold_types":     ["None", "Half Fold", "Tri-Fold", "Gate Fold"],
                    "laminations":    ["None", "Matte", "Glossy"],
                    "extras": {
                        "full_color":   3,
                        "double_sided": 2,
                        "half_fold":    1,
                        "tri_fold":     2,
                        "gate_fold":    3,
                        "matte_lam":    2,
                        "glossy_lam":   2,
                    }
                }
            },
            {
                "category": cat_objs["cat-3"],
                "name": "Mousepad", "slug": "mousepad",
                "base_price": 150.00,
                "is_available": True,
                "description": "Custom printed mousepads for desks and promotions.",
                "options_schema": {
                    "sizes":     ["Small (8×7 in)"],
                    "thickness": ["3mm (standard)", "5mm (thick)"],
                    "extras": {
                        "thickness_5mm": 30,
                    }
                }
            },
            {
                "category": cat_objs["cat-3"],
                "name": "Panaflex", "slug": "panaflex",
                "base_price": 45.00,
                "is_available": True,
                "description": "Backlit panaflex for signage and storefronts.",
                "options_schema": {
                    "units":       ["ft", "m"],
                    "presets":     ["3×5 ft", "4×6 ft", "6×8 ft", "Custom"],
                    "materials":   ["Frontlit (standard)", "Backlit (for lightboxes)"],
                    "thickness":   ["Standard", "Heavy Duty"],
                    "qualities":   ["Standard", "High Resolution"],
                    "ink_types":   ["Eco-Solvent", "UV Print"],
                    "usages":      ["Store Signage", "Billboard", "Event Banner", "Promotional Ad", "Others"],
                    "base_prices": {
                        "Frontlit (standard)":      45,
                        "Backlit (for lightboxes)": 65,
                    },
                    "price_per": "sqft",
                    "extras": {
                        "heavy_duty_per_sqft":    10,
                        "high_res_per_sqft":      10,
                        "uv_print_per_sqft":      15,
                        "eyelets":                20,
                        "rope":                   30,
                        "frame":                  200,
                    }
                }
            },
            {
                "category": cat_objs["cat-3"],
                "name": "Poster", "slug": "poster",
                "base_price": 30.00,
                "is_available": True,
                "description": "High quality poster printing in various sizes.",
                "options_schema": {
                    "sizes":          ["A4", "A3", "A2", "A1", "Custom"],
                    "orientations":   ["Portrait", "Landscape"],
                    "paper_types":    ["Matte Paper", "Glossy Paper", "Photo Paper", "Art Paper"],
                    "paper_weights":  ["120 GSM", "150 GSM", "200 GSM", "250 GSM"],
                    "print_qualities":["Standard", "High Resolution"],
                    "color_modes":    ["Full Color", "Black & White"],
                    "laminations":    ["None", "Matte", "Glossy"],
                    "mountings":      ["None", "Foam Board", "Sintra Board"],
                    "framings":       ["None", "With Frame"],
                    "usages":         ["Event Poster", "Movie Poster", "Educational Poster", "Advertisement", "Others"],
                    "base_prices": {
                        "A4":     30,
                        "A3":     60,
                        "A2":     120,
                        "A1":     200,
                        "Custom": 150,
                    },
                    "extras": {
                        "high_resolution":    20,
                        "full_color":         10,
                        "matte_lam":          15,
                        "glossy_lam":         15,
                        "foam_board":         50,
                        "sintra_board":       100,
                        "with_frame":         150,
                    }
                }
            },
            {
                "category": cat_objs["cat-3"],
                "name": "X-Banner", "slug": "x-banner",
                "base_price": 500.00,
                "is_available": True,
                "description": "X-frame banners for events and retail displays.",
                "options_schema": {
                    "sizes":        ["2ft x 5ft", "2ft x 6ft", "3ft x 6ft"],
                    "materials":    ["Tarpaulin (Matte)", "Tarpaulin (Glossy)", "Synthetic Paper"],
                    "qualities":    ["Standard", "High Resolution"],
                    "stand_types":  ["Standard X-Stand", "Heavy Duty X-Stand"],
                    "base_prices":  {
                        "2ft x 5ft": 500,
                        "2ft x 6ft": 600,
                        "3ft x 6ft": 800,
                    },
                    "extras": {
                        "high_resolution":      100,
                        "heavy_duty_stand":     300,
                        "eyelets_per_pc":       20,
                        "reinforced_corners":   30,
                    }
                }
            },

            # ════════════════════════════════════════════
            # CATEGORY 4 — Novelty Items
            # ════════════════════════════════════════════
            {
                "category": cat_objs["cat-4"],
                "name": "Bag Tag", "slug": "bagtag",
                "base_price": 80.00,
                "is_available": True,
                "description": "Custom bag tags for luggage and bags.",
                "options_schema": {
                    "tag_types":      ["Luggage Tag", "School Bag Tag", "ID Tag", "Event Tag"],
                    "shapes":         ["Rectangle", "Round", "Oval", "Custom Die-Cut"],
                    "sizes":          ["Small (5x3 cm)", "Medium (8x5 cm)", "Large (10x6 cm)", "Custom Size"],
                    "materials":      ["PVC Plastic", "Acrylic", "Laminated Card"],
                    "thickness":      ["0.5mm", "1mm", "2mm"],
                    "print_types":    ["Single-sided", "Double-sided"],
                    "print_qualities":["Standard", "High Resolution"],
                    "strap_types":    ["Plastic Loop", "Metal Ring", "String"],
                    "clip_types":     ["None", "Basic Clip", "Heavy-duty Clip"],
                    "bg_colors":      ["White", "Black", "Custom"],
                    "base_prices":    {
                        "PVC Plastic":    80,
                        "Acrylic":        120,
                        "Laminated Card": 50,
                    },
                    "extras": {
                        "custom_die_cut":      40,
                        "double_sided":        20,
                        "high_resolution":     30,
                        "metal_ring":          15,
                        "heavy_duty_clip":     25,
                    }
                }
            },
            {
                "category": cat_objs["cat-4"],
                "name": "Eco Bag", "slug": "ecobag",
                "base_price": 80.00,
                "is_available": True,
                "description": "Custom printed eco-friendly tote bags.",
                "options_schema": {
                    "bag_types":       ["Tote Bag", "Drawstring Bag", "Canvas Bag", "Foldable Eco Bag"],
                    "sizes":           ["Small", "Medium", "Large", "Custom"],
                    "materials":       ["Cotton", "Canvas", "Non-woven Fabric", "Recycled Polyester"],
                    "bag_colors":      ["Natural (Beige)", "White", "Black", "Green", "Custom"],
                    "handle_types":    ["Short Handle", "Long Handle", "Drawstring"],
                    "print_methods":   ["Screen Printing", "Heat Transfer", "Sublimation", "Embroidery"],
                    "design_modes":    ["upload", "text"],
                    "font_styles":     ["Sans-serif", "Serif", "Script / Handwritten", "Bold Display", "Monospace"],
                    "print_placements":["Front", "Back", "Both Sides"],
                    "extras": {
                        "screen_printing":      20,
                        "heat_transfer":        25,
                        "sublimation":          30,
                        "embroidery":           35,
                        "both_sides":           15,
                        "back_placement":       15,
                        "inner_pocket":         15,
                        "zipper":               20,
                        "gusset":               15,
                        "custom_tag":           10,
                        "waterproof_lining":    25,
                    }
                }
            },
            {
                "category": cat_objs["cat-4"],
                "name": "Keychain", "slug": "keychain",
                "base_price": 30.00,
                "is_available": True,
                "description": "Custom printed or engraved keychains.",
                "options_schema": {
                    "keychain_types":   ["Acrylic Keychain", "PVC Rubber Keychain", "Metal Keychain", "Wooden Keychain", "Epoxy Keychain"],
                    "shapes":           ["Circle", "Square", "Rectangle", "Custom shape"],
                    "sizes":            ["Small (1–2 inches)", "Medium (2–3 inches)", "Large (3–4 inches)", "Custom size"],
                    "finishes":         ["Glossy", "Matte", "Epoxy Coated"],
                    "printing_styles":  ["Single-sided", "Double-sided"],
                    "design_modes":     ["upload", "text"],
                    "font_styles":      ["Sans-serif", "Serif", "Script / Handwritten", "Bold Display", "Monospace"],
                    "attachment_types": ["Standard Keyring", "Lobster Clasp", "Chain + Ring"],
                    "base_prices":      {
                        "Acrylic Keychain":     120,
                        "PVC Rubber Keychain":  95,
                        "Metal Keychain":       50,
                        "Wooden Keychain":      42,
                        "Epoxy Keychain":       45,
                    },
                    "extras": {
                        "double_sided":       5,
                        "epoxy_coated":       5,
                        "glitter":            3,
                        "holographic":        4,
                        "protective_film":    2,
                        "custom_packaging":   5,
                    }
                }
            },
            {
                "category": cat_objs["cat-4"],
                "name": "Porta Booth", "slug": "portabooth",
                "base_price": 5000.00,
                "is_available": True,
                "description": "Portable photo booth for events and parties.",
                "options_schema": {
                    "event_types":      ["Wedding", "Birthday", "Corporate Event", "School Event", "Others"],
                    "durations":        ["2", "3", "4", "Custom"],
                    "booth_types":      ["Open-Air Booth", "Enclosed Booth", "360 Video Booth"],
                    "backdrop_styles":  ["Plain Color", "Themed Backdrop", "Custom Backdrop"],
                    "booth_themes":     ["Elegant", "Fun & Colorful", "Minimalist", "Custom theme"],
                    "print_sizes":      ["2×6 Strip", "4×6 Photo", "Both"],
                    "print_copies":     ["1 Copy", "2 Copies", "Unlimited Prints"],
                    "layout_modes":     ["upload", "request"],
                    "location_types":   ["Indoor", "Outdoor"],
                    "extras": {
                        "extra_hour":         1500,
                        "video_booth_360":    3000,
                        "unlimited_prints":   1000,
                        "custom_backdrop":    1500,
                        "props":              500,
                        "red_carpet":         700,
                        "led_lighting":       800,
                        "additional_staff":   1000,
                    }
                }
            },
            {
                "category": cat_objs["cat-4"],
                "name": "Ref Magnet", "slug": "refmagnet",
                "base_price": 20.00,
                "is_available": True,
                "description": "Custom refrigerator magnets for souvenirs.",
                "options_schema": {
                    "magnet_types":  ["Photo Magnet", "Souvenir Magnet", "Calendar Magnet", "Business Promo Magnet", "Custom Magnet"],
                    "shapes":        ["Rectangle", "Square", "Circle", "Die-cut (custom shape)"],
                    "sizes":         ["Small (2\" × 2\")", "Medium (3\" × 4\")", "Large (4\" × 6\")", "Custom"],
                    "materials":     ["Flexible Magnet Sheet", "Rigid Magnet Board", "Acrylic Magnet"],
                    "finishes":      ["Glossy", "Matte", "Laminated"],
                    "thickness":     ["Standard", "Thick"],
                    "design_modes":  ["upload", "manual"],
                    "extras": {
                        "acrylic_magnet":     10,
                        "thick":              5,
                        "large_size":         5,
                        "die_cut":            5,
                        "laminated_finish":   3,
                        "qr_code":            2,
                        "metallic_finish":    4,
                        "packaging":          3,
                    }
                }
            },
            {
                "category": cat_objs["cat-4"],
                "name": "Round Fan", "slug": "roundfan",
                "base_price": 12.00,
                "is_available": True,
                "description": "Custom printed round fans for events.",
                "options_schema": {
                    "fan_styles":    ["Round Fan (Standard)", "Round Fan with Handle Extension", "Custom Shape Fan"],
                    "sizes":         ["6 inches", "8 inches", "10 inches", "Custom size"],
                    "materials":     ["Cardboard", "PVC Board", "Sintra Board"],
                    "print_surfaces":["Direct Print", "Sticker Print"],
                    "handle_types":  ["Plastic Handle", "Die-cut Handle", "No Handle"],
                    "print_styles":  ["Single-sided", "Double-sided"],
                    "edge_styles":   ["Standard Colored Rim", "Full Print (no border)"],
                    "design_modes":  ["upload", "manual"],
                    "extras": {
                        "size_8inch":       3,
                        "size_10inch":      3,
                        "pvc_board":        5,
                        "sintra_board":     5,
                        "double_sided":     3,
                        "gloss_lam":        2,
                        "matte_lam":        2,
                        "uv_coating":       2,
                        "packaging":        2,
                    }
                }
            },
            {
                "category": cat_objs["cat-4"],
                "name": "Tumbler", "slug": "tumblr",
                "base_price": 150.00,
                "is_available": True,
                "description": "Custom printed tumblers and water bottles.",
                "options_schema": {
                    "tumbler_types":    ["Stainless Steel Tumbler", "Plastic Tumbler", "Acrylic Tumbler", "Insulated Travel Mug", "Glass Tumbler"],
                    "capacities":       ["12 oz", "16 oz", "20 oz", "24 oz", "Custom size"],
                    "lid_types":        ["Slide Lid", "Straw Lid", "Flip Lid"],
                    "materials":        ["Stainless Steel", "Plastic", "Acrylic", "Glass"],
                    "tumbler_colors":   ["Black", "White", "Silver", "Transparent"],
                    "print_methods":    ["UV Printing", "Sublimation", "Laser Engraving", "Vinyl Decal"],
                    "print_placements": ["Front", "Back", "Wrap-around (full body)"],
                    "design_modes":     ["upload", "text"],
                    "font_styles":      ["Classic Serif", "Modern Sans", "Script / Cursive", "Bold Display", "Handwritten"],
                    "extras": {
                        "stainless_steel":      50,
                        "glass":                40,
                        "uv_printing":          20,
                        "sublimation":          25,
                        "laser_engraving":      30,
                        "wrap_around":          15,
                        "name_personalization": 10,
                        "gift_packaging":       15,
                        "extra_lid":            20,
                        "straw":                10,
                        "temp_upgrade":         30,
                    }
                }
            },
            {
                "category": cat_objs["cat-4"],
                "name": "Wall Clock", "slug": "wallclock",
                "base_price": 250.00,
                "is_available": True,
                "description": "Custom printed wall clocks for home and office.",
                "options_schema": {
                    "clock_types":   ["Classic Analog Clock", "Modern Minimalist Clock", "Photo Wall Clock", "Acrylic Wall Clock", "Wooden Wall Clock"],
                    "shapes":        ["Round", "Square", "Rectangle", "Custom shape"],
                    "sizes":         ["Small (8 inches)", "Medium (10 inches)", "Large (12 inches)", "Extra Large (14+ inches)", "Custom size"],
                    "materials":     ["Plastic", "Acrylic", "Wood", "Glass"],
                    "frame_types":   ["Frameless", "Plastic Frame", "Metal Frame", "Wooden Frame"],
                    "mechanisms":    ["Standard Movement", "Silent Sweep Movement"],
                    "print_styles":  ["Full Face Print", "Partial Design (center only)", "Transparent Background"],
                    "design_modes":  ["upload", "text"],
                    "font_styles":   ["Classic Serif", "Modern Sans", "Script / Cursive", "Bold Display", "Handwritten"],
                    "extras": {
                        "acrylic":           50,
                        "wood":              60,
                        "glass":             70,
                        "large_size":        30,
                        "extra_large_size":  50,
                        "silent_mechanism":  40,
                        "glow_numbers":      20,
                        "metallic_hands":    25,
                        "custom_packaging":  30,
                        "battery":           10,
                    }
                }
            },

            # ════════════════════════════════════════════
            # CATEGORY 5 — Specialty Prints
            # ════════════════════════════════════════════
            {
                "category": cat_objs["cat-5"],
                "name": "Backlit", "slug": "backlit",
                "base_price": 60.00,
                "is_available": True,
                "description": "Backlit film printing for lightboxes and signage.",
                "options_schema": {
                    "presets":      ["2 × 4 ft", "3 × 6 ft", "4 × 8 ft", "Custom"],
                    "materials":    ["Backlit Film (premium)", "Backlit Tarpaulin"],
                    "thickness":    ["Standard", "Heavy Duty"],
                    "qualities":    ["Standard", "High Resolution"],
                    "glows":        ["Low Glow", "Medium Glow", "High Brightness"],
                    "installations":["None", "Basic Installation", "Full Installation"],
                    "usages":       ["Store Signage", "Mall Advertisement", "Lightbox Display", "Event Booth", "Others"],
                    "base_prices":  {
                        "Backlit Film (premium)": 80,
                        "Backlit Tarpaulin":      60,
                    },
                    "price_per": "sqft",
                    "extras": {
                        "heavy_duty_per_sqft":    10,
                        "high_res_per_sqft":      15,
                        "include_frame":          300,
                        "basic_installation":     200,
                        "full_installation":      500,
                    }
                }
            },
            {
                "category": cat_objs["cat-5"],
                "name": "Umbrella", "slug": "umbrella",
                "base_price": 250.00,
                "is_available": True,
                "description": "Custom printed umbrellas for events and giveaways.",
                "options_schema": {
                    "umbrella_types":    ["Folding Umbrella", "Stick Umbrella", "Golf Umbrella"],
                    "sizes":             ["Small (21–23 inches)", "Medium (24–26 inches)", "Large (27–30 inches)"],
                    "canopy_materials":  ["Polyester", "Pongee Fabric"],
                    "frame_types":       ["Aluminum", "Fiberglass"],
                    "print_coverages":   ["Logo Only", "Partial Print", "Full Canopy Print"],
                    "print_methods":     ["Heat Transfer", "Sublimation Print"],
                    "base_colors":       ["Black", "White", "Red", "Blue", "Custom"],
                    "base_prices":       {
                        "Folding Umbrella": 250,
                        "Stick Umbrella":   350,
                        "Golf Umbrella":    600,
                    },
                    "extras": {
                        "pongee_fabric":      100,
                        "full_canopy_print":  200,
                        "partial_print":      100,
                        "uv_protection":      80,
                        "waterproof_coating": 50,
                    }
                }
            },
        ]

        # ── Create or Update ─────────────────────────────
        created_count = 0
        updated_count = 0

        for svc in services:
            obj, created = Service.objects.update_or_create(
                slug=svc["slug"],
                defaults={
                    "category":       svc["category"],
                    "name":           svc["name"],
                    "base_price":     svc["base_price"],
                    "is_available":   svc["is_available"],
                    "description":    svc["description"],
                    "options_schema": svc["options_schema"],
                }
            )
            if created:
                created_count += 1
                self.stdout.write(f"  ✅ Created: {svc['name']}")
            else:
                updated_count += 1
                self.stdout.write(f"  🔄 Updated: {svc['name']}")

        self.stdout.write(self.style.SUCCESS(
            f"\n🎉 Done! {created_count} created, {updated_count} updated."
            f"\n📦 Total: {len(services)} services across 5 categories."
            f"\n⏳ Under construction: Cap, Lanyard (is_available=False)"
        ))