const nextConfig = {
  /* config options here */
  images: {
    domains: ['p3-juejin.byteimg.com', 'p1-juejin.byteimg.com', 'p9-juejin.byteimg.com', 'p6-juejin.byteimg.com'],
  },
  eslint: {
    // 打包时忽略eslint规则
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
