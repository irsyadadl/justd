const isDev = process.argv.indexOf("dev") !== -1
const isBuild = process.argv.indexOf("build") !== -1
const versionOneUrl = process.env.NEXT_PUBLIC_APP_V1_URL
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = "1"
  const { build } = await import("velite")
  await build({ watch: isDev, clean: !isDev })
}

/** @type {import("next").NextConfig} */
export default {
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
  experimental: {
    reactCompiler: true,
    optimizePackageImports: ["shiki"],
  },
  async rewrites() {
    return [
      {
        source: "/docs/1.x/:slug*",
        destination: `${versionOneUrl}/docs/1.x/:slug*`,
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/docs/:slug((?![12]\\.x/).*)",
        missing: [
          {
            type: "header",
            key: "x-no-redirect",
          },
        ],
        destination: "/docs/2.x/:slug*",
        permanent: false,
      },
      {
        source: "/docs/2.x/components/layouts/aside",
        destination: "/docs/2.x/components/layouts/sidebar",
        permanent: true,
      },
      {
        source: "/docs/2.x/components/surfaces/chart",
        destination: "/docs/2.x/components/charts/setup",
        permanent: true,
      },
      {
        source: "/docs/2.x/components/collections/accordion",
        destination: "/docs/2.x/components/navigation/disclosure-group",
        permanent: true,
      },
    ]
  },
}
