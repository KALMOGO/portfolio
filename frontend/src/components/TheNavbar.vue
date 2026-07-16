<script setup>
import { ref } from 'vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import personal from '../data/portfolio-data.json'

const menuOpen = ref(false)
const name = personal.personal.name
</script>

<template>
  <header>
    <nav class="container">
      <a href="#" class="logo">{{ name }}</a>

      <div class="nav-links" :class="{ open: menuOpen }" @click="menuOpen = false">
        <a href="#about">{{ $t('nav.about') }}</a>
        <a href="#skills">{{ $t('nav.skills') }}</a>
        <a href="#projects">{{ $t('nav.projects') }}</a>
        <a href="#services">{{ $t('nav.services') }}</a>
        <a href="#formation">{{ $t('nav.formation') }}</a>
        <a href="#publications">{{ $t('nav.publications') }}</a>
        <a href="#contact">{{ $t('nav.contact') }}</a>
      </div>

      <div class="nav-actions">
        <LanguageSwitcher />
        <a href="#contact" class="btn">{{ $t('hero.actions.contact') }}</a>
        <button class="burger" @click="menuOpen = !menuOpen" aria-label="Menu">☰</button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  position: sticky; top: 0; z-index: 50;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}
nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 24px;
}
.logo { font-weight: 700; font-size: 1.2rem; color: var(--blue-dark); }
.nav-links { display: flex; gap: 28px; font-weight: 500; color: var(--muted); }
.nav-links a:hover { color: var(--blue); }
.nav-actions { display: flex; align-items: center; gap: 18px; }
.burger { display: none; background: none; border: none; font-size: 1.4rem; cursor: pointer; }

@media (max-width: 850px) {
  .nav-links {
    display: none;
    position: absolute; top: 64px; left: 0; right: 0;
    background: #fff; border-bottom: 1px solid var(--border);
    flex-direction: column; padding: 16px 24px; gap: 16px;
  }
  .nav-links.open { display: flex; }
  .burger { display: block; }
  .nav-actions .btn { display: none; }
}
</style>
