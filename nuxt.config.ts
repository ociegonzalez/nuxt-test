export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    css: [
        '~/assets/css/main.css'
    ],
    app: {
        head: {
            title: 'Ociel Store',
            meta: [
                {
                    name: 'description',
                    content: 'Ociel Store'
                }
            ]
        }
    },
    // SPA
    // ssr: false,
    // nitro: {
    //     preset: "static",
    //     static: true,
    // },
    // Pre-render
    nitro: {
        prerender: {
            routes: ['/', '/about', '/contact', '/products', '/pricing'],
            ignore: ['/dashboard', '/dashboard/**'],
            crawlLinks: true,
        }
    },
    modules: [
      '@nuxt/eslint',
      '@nuxt/icon',
      '@nuxt/fonts',
      '@nuxt/hints',
      '@nuxt/image',
      '@nuxt/ui',
      'nuxt-auth-utils'
    ]
})