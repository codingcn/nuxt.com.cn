import { createSharedComposable } from '@vueuse/core'

const _useNavigation = () => {
  const route = useRoute()

  const headerLinks = computed(() => [{
    label: '文档',
    icon: 'i-ph-book-bookmark-duotone',
    to: '/docs',
    children: [{
      label: '快速入门',
      description: '学习如何开始使用Nuxt.',
      icon: 'i-ph-rocket-launch-duotone',
      to: '/docs/getting-started',
      active: route.path.startsWith('/docs/getting-started')
    }, {
      label: '指南',
      description: '学习如何构建和部署Nuxt应用程序.',
      icon: 'i-ph-book-open-duotone',
      to: '/docs/guide',
      active: route.path.startsWith('/docs/guide')
    }, {
      label: 'API',
      description: '探索Nuxt API.',
      icon: 'i-ph-code',
      to: '/docs/api',
      active: route.path.startsWith('/docs/api')
    }, {
      label: '示例',
      description: '发现和探索官方和社区示例.',
      icon: 'i-ph-app-window-duotone',
      to: '/docs/examples',
      active: route.path.startsWith('/docs/examples')
    }, {
      label: '社区',
      description: '从社区中寻找答案和支持.',
      icon: 'i-ph-chats-teardrop-duotone',
      to: '/docs/community',
      active: route.path.startsWith('/docs/community')
    }]
  }, {
    label: '模块',
    icon: 'i-ph-puzzle-piece-duotone',
    to: '/modules'
  }, {
    label: '模板',
    icon: 'i-ph-app-window-duotone',
    to: 'https://nuxt.new',
    target: '_blank'
  }, {
    label: '展示',
    icon: 'i-ph-projector-screen-duotone',
    to: '/showcase'
  }, {
    label: '企业',
    icon: 'i-ph-buildings-duotone',
    to: '/enterprise',
    children: [{
      label: 'Support',
      to: '/enterprise/support',
      description: '直接从Nuxt.js团队获取帮助',
      icon: 'i-ph-lifebuoy-duotone'
    }, {
      label: 'Agencies',
      to: '/enterprise/agencies',
      description: 'Find an agency that specializes in Nuxt.js development.',
      icon: 'i-ph-handshake-duotone'
    }, {
      label: 'Sponsors',
      to: '/enterprise/sponsors',
      description: 'Become a sponsor and get your logo on our README on GitHub with a link to your site.',
      icon: 'i-ph-hand-heart-duotone'
    }, {
      label: 'Jobs',
      to: '/enterprise/jobs',
      description: 'Find a job or post a job opportunity for Nuxt.js experts.',
      icon: 'i-ph-briefcase-duotone'
    }]
  }, {
    label: '博客',
    icon: 'i-ph-newspaper-duotone',
    to: '/blog'
  }])

  const footerLinks = [{
    label: 'Community',
    children: [{
      label: 'Nuxters',
      to: 'https://nuxters.nuxt.com',
      target: '_blank'
    }, {
      label: 'Video Courses',
      to: 'https://masteringnuxt.com/nuxt3?ref=nuxt',
      target: '_blank'
    }, {
      label: 'Nuxt on GitHub',
      to: 'https://github.com/nuxt',
      target: '_blank'
    }, {
      label: 'Design Kit',
      to: '/design-kit'
    }]
  }, {
    label: 'Enterprise',
    children: [{
      label: 'Support',
      to: '/enterprise/support'
    }, {
      label: 'Agencies',
      to: '/enterprise/agencies'
    }, {
      label: 'Jobs',
      to: '/enterprise/jobs'
    }, {
      label: 'Sponsors',
      to: '/enterprise/sponsors'
    }]
  }, {
    label: 'Solutions',
    children: [{
      label: 'Nuxt Content',
      to: 'https://content.nuxt.com/',
      target: '_blank'
    }, {
      label: 'Nuxt DevTools',
      to: 'https://devtools.nuxt.com/',
      target: '_blank'
    }, {
      label: 'Nuxt Image',
      to: 'https://image.nuxt.com/',
      target: '_blank'
    }, {
      label: 'Nuxt UI',
      to: 'https://ui.nuxt.com/',
      target: '_blank'
    }]
  }]

  const searchLinks = computed(() => [...headerLinks.value.map(link => {
    // Remove `/docs` and `/enterprise` links from command palette
    if (['/docs', '/enterprise'].includes(link.to)) {
      return {
        label: link.label,
        icon: link.icon,
        children: link.children
      }
    }

    return link
  }).filter(Boolean), {
    label: 'Design Kit',
    icon: 'i-ph-palette-duotone',
    to: '/design-kit'
  }, {
    label: 'Newsletter',
    icon: 'i-ph-envelope-simple-duotone',
    to: '/newsletter'
  }])

  const searchGroups = [{
    key: 'modules-search',
    label: 'Modules',
    search: async (q) => {
      const { modules, fetchList } = useModules()
      if (!modules.value.length) {
        await fetchList()
      }

      return modules.value
        .filter(module => ['name', 'npm', 'repo'].map(field => module[field]).filter(Boolean).some(value => value.search(searchTextRegExp(q)) !== -1))
        .map(module => ({
          id: `module-${module.name}`,
          label: module.name,
          suffix: module.description,
          avatar: {
            src: moduleImage(module.icon)
          },
          to: `/modules/${module.name}`
        }))
    }
  }, {
    key: 'articles-search',
    label: 'Articles',
    search: async (q) => {
      if (!q) {
        return []
      }

      const { articles, fetchList } = useBlog()
      if (!articles.value.length) {
        await fetchList()
      }

      return articles.value
        .filter(article => article.title.search(searchTextRegExp(q)) !== -1)
        .map(article => ({
          id: `article-${article._path}`,
          label: article.title,
          suffix: article.description,
          icon: 'i-ph-newspaper',
          to: article._path
        }))
    }
  }]

  return {
    headerLinks,
    footerLinks,
    searchLinks,
    searchGroups
  }
}

export const useNavigation = createSharedComposable(_useNavigation)
