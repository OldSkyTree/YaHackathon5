<template>
  <header class="header">
    <div class="header-logo">
      <router-link to="/">
        <img 
          src="../assets/logo-cosmo.png" 
          alt="The Cosmos"
        >
      </router-link>
    </div>
    <nav class="header-nav">
      <ul>
        <li class="header-nav__item">
          <router-link 
            to="/about-game" 
            class="header-nav__link"
          >
            Об игре
          </router-link>
        </li>
        <li class="header-nav__item">
          <router-link 
            to="/top-players" 
            class="header-nav__link"
          >
            Топ игроков
          </router-link>
        </li>
        <li class="header-nav__item">
          <router-link 
            to="/about-developers" 
            class="header-nav__link"
          >
            Разработчики
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
<style>
  .header {
    width: 100%;
    display: flex;
  }

  .header-logo {
    margin-right: auto;
  }

  .header-nav {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding-right: 190px;
  }

  .header-nav__link {
    color: #fff;
    text-decoration: none;
    font-weight: 500;
  }

  .header-nav__link:hover {
    text-decoration: underline;
  }
</style>
