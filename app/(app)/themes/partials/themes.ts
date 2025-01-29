import colors from "@/resources/colors/colors.json"
import {
  accentColors300,
  accentColors400,
  accentColors500,
  adjustLightness,
  neutralColors,
} from "@/resources/lib/colors"

type BlackWhite = "white" | "black"

type Shade = keyof (typeof colors)["slate"]
export const getColorValue = (colorKey: string | BlackWhite, shade?: Shade) => {
  if (colorKey === "white") return "var(--color-white)"
  if (colorKey === "black") return `var(--color-${colorKey}-950)`
  if (!shade) throw new Error(`Shade is required for colorKey: ${colorKey}`)
  return colors[colorKey as keyof typeof colors][shade]
}

type ForegroundColor = Shade | BlackWhite
const getFgValue = (colorKey: string, fg: ForegroundColor) => {
  if (fg === "white" || fg === "black") return getColorValue(fg)
  return getColorValue(colorKey, fg)
}

export const generateTheme = (
  selectedColors: Record<"primary" | "gray" | "accent" | "radius", string>,
) => {
  const { primary, gray, accent, radius } = selectedColors

  const isNeutralPrimary = neutralColors.includes(primary)
  const isShade400Primary = accentColors400.includes(primary)
  const isShade500Primary = accentColors500.includes(primary)
  const isShade300Primary = accentColors300.includes(primary)

  const isNeutralAccent = neutralColors.includes(accent)
  const isShade400Accent = accentColors400.includes(accent)
  const isShade500Accent = accentColors500.includes(accent)
  const isShade300Accent = accentColors300.includes(accent)

  const determineShade = (
    isNeutral: boolean,
    is500: boolean,
    is300: boolean,
    is400: boolean,
    isDarkMode = false,
  ) => {
    if (isNeutral) return isDarkMode ? "50" : "950" // Adjust for light and dark
    if (is500) return "500"
    if (is300) return "300"
    if (is400) return "400"
    return "600"
  }

  const determineForeground = (isNeutral: boolean, is400: boolean, isDarkMode = false) => {
    if (isNeutral) return isDarkMode ? "950" : "50"
    return is400 ? "950" : "white"
  }

  const lightPrimary: Shade = determineShade(
    isNeutralPrimary,
    isShade500Primary,
    isShade300Primary,
    isShade400Primary,
  )
  const lightPrimaryFg: ForegroundColor = determineForeground(isNeutralPrimary, isShade400Primary)

  const darkPrimary: Shade = determineShade(
    isNeutralPrimary,
    isShade500Primary,
    isShade300Primary,
    isShade400Primary,
    true,
  )
  const darkPrimaryFg: ForegroundColor = determineForeground(
    isNeutralPrimary,
    isShade400Primary,
    true,
  )

  const lightAccent: Shade = isNeutralAccent
    ? "200"
    : determineShade(isNeutralAccent, isShade500Accent, isShade300Accent, isShade400Accent)
  const lightAccentFg: ForegroundColor = isNeutralAccent
    ? "950"
    : determineForeground(isNeutralAccent, isShade400Accent)

  const darkAccent: Shade = isNeutralAccent
    ? "800"
    : determineShade(isNeutralAccent, isShade500Accent, isShade300Accent, isShade400Accent, true)
  const darkAccentFg: ForegroundColor = isNeutralAccent
    ? "50"
    : determineForeground(isNeutralAccent, isShade400Accent, true)

  const dangerColor =
    primary === "red" ? adjustLightness(getColorValue("red", "600"), -4) : "var(--color-red-600)"

  const warningColor = primary === "amber" ? "var(--color-amber-200)" : "var(--color-amber-400)"

  const lightPrimaryFgValue = getFgValue(primary, lightPrimaryFg)
  const darkPrimaryFgValue = getFgValue(primary, darkPrimaryFg)
  const lightAccentFgValue = getFgValue(accent, lightAccentFg)
  const darkAccentFgValue = getFgValue(accent, darkAccentFg)

  const chartShadesLight: Array<Shade> = isNeutralPrimary
    ? ["900", "700", "600", "500", "400"]
    : ["600", "400", "300", "200", "100"]

  const chartShadesDark: Array<Shade> = isNeutralPrimary
    ? ["800", "700", "500", "400", "300"]
    : ["700", "500", "400", "300", "200"]

  const lightRingShade = isNeutralPrimary ? "950" : "600"
  const darkRingShade = isNeutralPrimary ? "50" : "600"

  const lightColors = `--bg: var(--color-white);
    --fg: var(--color-${gray}-950);
    
    --primary: var(--color-${primary}-${lightPrimary});
    --primary-fg: ${lightPrimaryFgValue};
    
    --secondary: var(--color-${gray}-100);
    --secondary-fg: var(--color-${gray}-950);
    
    --overlay: var(--color-white);
    --overlay-fg: var(--color-${gray}-950);
    
    --accent: var(--color-${accent}-${lightAccent});
    --accent-fg: ${lightAccentFgValue};
    
    --muted: var(--color-${gray}-100);
    --muted-fg: var(--color-${gray}-600);
    
    --success: var(--color-emerald-600);
    --success-fg: var(--color-white);
    
    --warning: ${warningColor};
    --warning-fg: var(--color-amber-950);
    
    --danger: ${dangerColor};
    --danger-fg: var(--color-red-50);
    
    --border: var(--color-${gray}-200);
    --input: var(--color-${gray}-300);
    --ring: var(--color-${primary}-${lightRingShade});
    
    --navbar: var(--color-${gray}-50);
    --navbar-fg: var(--color-${gray}-950);
    
    --sidebar: var(--color-${gray}-50);
    --sidebar-fg: var(--color-${gray}-950);
    
    --chart-1: var(--color-${primary}-${chartShadesLight[0]});
    --chart-2: var(--color-${primary}-${chartShadesLight[1]});
    --chart-3: var(--color-${primary}-${chartShadesLight[2]});
    --chart-4: var(--color-${primary}-${chartShadesLight[3]});
    --chart-5: var(--color-${primary}-${chartShadesLight[4]});
`

  const darkColors = `--bg: var(--color-${gray}-950);
    --fg: var(--color-${gray}-50);
    
    --primary: var(--color-${primary}-${darkPrimary});
    --primary-fg: ${darkPrimaryFgValue};
    
    --secondary: ${adjustLightness(getColorValue(gray, "800"), -3)};
    --secondary-fg: var(--color-${gray}-50);
    
    --accent: var(--color-${accent}-${darkAccent});
    --accent-fg: ${darkAccentFgValue};
    
    --muted: var(--color-${gray}-900);
    --muted-fg: var(--color-${gray}-400);
    
    --overlay: ${adjustLightness(getColorValue(gray, "900"), -4)};
    --overlay-fg: var(--color-${gray}-50);
    
    --success: var(--color-emerald-600);
    --success-fg: var(--color-white);
    
    --warning: ${warningColor};
    --warning-fg: var(--color-amber-950);
    
    --danger: ${dangerColor};
    --danger-fg: var(--color-red-50);
    
    --border: ${adjustLightness(getColorValue(gray, "700"), -10)};
    --input: ${adjustLightness(getColorValue(gray, "700"), -8)};
    --ring: var(--color-${primary}-${darkRingShade});
    
    --navbar: ${adjustLightness(getColorValue(gray, "900"), -4)};
    --navbar-fg: var(--color-${gray}-50);
    
    --sidebar: ${adjustLightness(getColorValue(gray, "900"), -5)};
    --sidebar-fg: var(--color-${gray}-50);
   
    --chart-1: var(--color-${primary}-${chartShadesDark[0]});
    --chart-2: var(--color-${primary}-${chartShadesDark[1]});
    --chart-3: var(--color-${primary}-${chartShadesDark[2]});
    --chart-4: var(--color-${primary}-${chartShadesDark[3]});
    --chart-5: var(--color-${primary}-${chartShadesDark[4]});`

  const radiusValues = `
    --radius-lg: ${radius || "0.5rem"};
    --radius-xs: calc(var(--radius-lg) * 0.5);
    --radius-sm: calc(var(--radius-lg) * 0.75);
    --radius-md: calc(var(--radius-lg) * 0.9);
    --radius-xl: calc(var(--radius-lg) * 1.25);
    --radius-2xl: calc(var(--radius-lg) * 1.5);
    --radius-3xl: calc(var(--radius-lg) * 2);
    --radius-4xl: calc(var(--radius-lg) * 3);`

  return `@layer base {
  :root {
    ${lightColors}${radiusValues}
  }
  
  .dark {
    ${darkColors}
  }
}`
}
