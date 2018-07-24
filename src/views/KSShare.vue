<template>
    <b-container>
        <div class="redirect-msg">
            <span>Redirecting to Kickstarter...</span>
        </div>
    </b-container>
</template>

<script>
//document.location = 'https://www.kickstarter.com/projects/20846993/1918053814?ref=428406&token=463f30f0';
</script>

<style lang="scss">
.redirect-msg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 90vh;
    width: 100%;

    span {
        text-align: center;
    }
}
</style>
