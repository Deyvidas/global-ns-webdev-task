<script lang="ts">
    import { page } from '$app/stores'
    import type { HTMLAnchorAttributes } from 'svelte/elements'

    type $$Props = HTMLAnchorAttributes & {
        href: string
    }
    export let href: $$Props['href']

    $: url = $page.url.pathname
</script>

<a {href} class:active={url === href} {...$$restProps}>
    <slot></slot>
</a>

<style lang="scss">
    a {
        color: green;
        transition: color 0.3s ease-in;

        &:hover {
            text-decoration: underline;
        }

        &.active {
            color: orange;
        }
    }
</style>
