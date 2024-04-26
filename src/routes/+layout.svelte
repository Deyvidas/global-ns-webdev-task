<script type="ts">
    import Container from 'components/Container.svelte'
    import '../app.scss'
</script>

<Container>
    <header class="header">
        <span>[header]</span>
        <a href="/">homepage</a>
        <a href="/about">about</a>
        <a href="/settings">settings</a>
    </header>
</Container>

<Container>
    <slot></slot>
</Container>

<Container>
    <footer class="footer">
        <span>[footer]</span>
        <a href="/">homepage</a>
        <a href="/about">about</a>
        <a href="/settings">settings</a>
    </footer>
</Container>

<style lang="scss">
    .header,
    .footer {
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 1em;
        height: 4em;
    }
</style>
