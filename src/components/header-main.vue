<template>
  <header class="header">
    <router-link
      to="/"
      class="header-logo"
    >
      <img 
        src="../assets/logo-cosmo.png" 
        alt="The Cosmos"
        class="header-logo__image"
      >
    </router-link>
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
    box-sizing: border-box;
    padding: 30px 20px 10px;
  }

  .header-logo {
    flex: 1 1 18%; 
  }

  .header-logo__image {
    max-width: 100%;
    max-height: 100%;
    display: block;
  }

  .header-nav {
    display: flex;
    flex: 4 1 82%; 
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding-right: 18%;
  }

  .header-nav__link {
    color: #fff;
    text-decoration: none;
    font-weight: 500;
  }

  .header-nav__link:hover {
    text-decoration: underline;
  }

  /*********************************** Responsive styles */

  @media screen and (max-width: 767px) {
    .header { 
      flex-flow: row wrap; 
      padding: 20px 15px 10px; 
    }
    .header-logo { 
      flex: none; 
      width: 150px; 
      margin: 0 auto 10px; 
    }
    .header-nav { 
      padding: 0; 
    }
  }
</style>
