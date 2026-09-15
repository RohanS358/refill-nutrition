/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // cPanel/Passenger: ship a self-contained server instead of 498MB of
  // node_modules. Produces .next/standalone with only what runtime needs.
  output: "standalone",
}

export default nextConfig
