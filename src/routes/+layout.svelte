<script type="ts">
    import { page } from '$app/stores'

    import Container from 'components/Container.svelte'
    import '../app.scss'
    import Link from 'components/Link.svelte'

    $: url = $page.url.pathname
</script>

<Container class="container">
    <header class="header">
        <Link href="/">Главная</Link>
        <Link href="/send-request">Оставить заявку</Link>
    </header>
</Container>

<Container class="container">
    <slot></slot>
</Container>

<style lang="scss">
    a {
        color: green;
        &.active {
            text-decoration: underline;
            color: orangered;
        }
    }

    .header,
    .footer {
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 1em;
        height: 4em;
    }
</style>
