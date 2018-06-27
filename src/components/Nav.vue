<template>
    <nav class="navbar fixed-top navbar-expand-lg justify-content-between navbar-dark bg-dark">
        <a href="/" class="navbar-brand w-nav-brand"></a>
        <button class="navbar-toggler" type="button"
                data-toggle="collapse" data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false"
                aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end"
             id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a href="https://instagram.com/tinkerkitch/"
                       class="nav-link social-icon"
                    ><img src="/images/Instagram-White2x.png" width="24"></a>
                </li>
                <li class="nav-item">
                    <a href="https://twitter.com/tinkerkitch"
                       class="nav-link social-icon"
                    ><img src="/images/Twitter-White2x.png" width="24"></a>
                </li>
                <li class="nav-item">
                    <a href="https://www.facebook.com/tinkerkitchen"
                       class="nav-link social-icon"
                    ><img src="/images/Facebook-White2x.png" width="24"></a>
                </li>
            </ul>
        </div>
        <li v-if="user" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#"
               id="navbarDropdownMenuLink" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">{{ user.name }}</a>
            <div class="dropdown-menu dropdown-menu-right"
                 aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" href="/account">Account</a>
                <a class="dropdown-item" href="#"
                   data-action="/signout"
                   data-redirect="/">Sign out</a>
            </div>
        </li>
        <li v-else class="nav-item">
            <a class="nav-link" href="/signin">Sign in <i class="fas fa-sign-in-alt"></i></a>
        </li>
    </nav>
</template>

<script>
</script>

<style lang="scss">
 .navbar .navbar-brand {
     background: url('/images/TK Wordmark White (1x).png');
     background-size: 220px 16px;
     width: 220px;
     height: 16px;
 }
 @media (min-width: 576px) {
     .navbar .navbar-brand {
         background-size: 300px 22px;
         width: 300px;
         height: 22px;
     }
 }

 /* Also used in footer */
 .social-icon {
     opacity: 0.8;
     transition: opacity 250ms;
 }
 .social-icon:hover {
     opacity: 1;
 }
</style>
