<script setup>
import TheNavbar from '../components/TheNavbar.vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import CollabCTASection from '../components/CollabCTASection.vue'
import FormationSection from '../components/FormationSection.vue'
import PublicationsSection from '../components/PublicationsSection.vue'
import ExperienceSection from '../components/ExperienceSection.vue'
import ContactSection from '../components/ContactSection.vue'
import TheFooter from '../components/TheFooter.vue'
import data from '../data/portfolio-data.json'

const hasTestimonials = data.testimonials.length > 0
</script>

<template>
  <TheNavbar />
  <HeroSection />
  <AboutSection />
  <SkillsSection />
  <ProjectsSection />
  <ServicesSection />
  <TestimonialsSection v-if="hasTestimonials" />
  <CollabCTASection v-else />
  <FormationSection />
  <PublicationsSection />
  <ExperienceSection />
  <ContactSection />
  <TheFooter />
</template>
