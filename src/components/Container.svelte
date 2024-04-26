<script lang="ts">
    let cls: 'container' | 'container-right' | 'container-left' = 'container'
    export { cls as class }
</script>

<div class={cls}>
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
