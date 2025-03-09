<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon
          v-html="miniVariant ? 'mdi-chevron-right' : 'mdi-chevron-left'"
        />
      </v-btn>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" app>
      <v-list nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

type NavigationItem = { icon: string; title: string; to: string }

@Component
class DefaultLayout extends Vue {
  drawer: boolean = true

  fixed: boolean = false

  items: NavigationItem[] = [
    { icon: 'mdi-apps', title: 'Welcome', to: '/' },
    { icon: 'mdi-chart-bubble', title: 'Build', to: '/build' },
    { icon: 'mdi-cloud-upload', title: 'Submit', to: '/submit' },
    { icon: 'mdi-equalizer', title: 'Results', to: '/results' }
  ]

  miniVariant: boolean = false

  title: string = 'Lyst App'
}

export default DefaultLayout
</script>
