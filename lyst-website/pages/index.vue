<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">Welcome to the Lyst App</v-card-title>
        <v-card-text>
          <p>Lyst is currently nothing.</p>
          <div class="text-xs-right">
            <em>
              <small>&mdash; Dylan Husted</small>
            </em>
          </div>
          <hr class="my-3" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text nuxt to="/build">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
class WelcomePage extends Vue {}

export default WelcomePage
</script>
