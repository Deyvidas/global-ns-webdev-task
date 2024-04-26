<script lang="ts">
    import type { HTMLBaseAttributes } from 'svelte/elements'

    type TClass = 'container' | 'container-right' | 'container-left'
    type $$Props = HTMLBaseAttributes & {
        class: TClass
    }
    let cls: $$Props['class']
    export { cls as class }
</script>

<div class={cls} {...$$restProps}>
    <slot></slot>
</div>

<style lang="scss">
    $container-padding-max: calc((100vw - $container-width) / 2);

    .container {
        width: 100%;
        padding-inline: max($container-padding-max, $container-padding-min);
    }

    .container-right {
        padding-left: max($container-padding-max, $container-padding-min);
    }

    .container-left {
        padding-right: max($container-padding-max, $container-padding-min);
    }
</style>
