import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
export default {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: preprocess({
        scss: { prependData: `@import './static/index.scss';` }
    }),

    kit: {
        // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
        // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
        // See https://kit.svelte.dev/docs/adapters for more information about adapters.
        adapter: adapter(),

        alias: {
            'components/*': 'src/components/*',
            'database/*': 'src/database/*'
        }
    },

    onwarn: (warning, handler) => {
        if (warning.code === 'css-unused-selector') return
        handler(warning)
    }
}
