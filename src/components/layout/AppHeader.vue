<template>
    <header class="header">
        <div class="container">
            <h2 class="header__heading">
                <slot name="heading">Page</slot>
            </h2>
        </div>
    </header>
</template>

<style lang="scss">
.header {
    height: 70px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid $light-grey;
    margin-bottom: 30px;

    &__heading {
        color: #696969;
        text-transform: uppercase;
        font-size: 22px;
    }
}
</style>