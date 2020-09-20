<template>
  <Vssue :title="title" :options="options" />
</template>

<script>
import { VssueComponent } from 'vssue'
import GithubV3 from '@vssue/api-github-v3'
import 'vssue/dist/vssue.css'

const { commentOptions } = require('@/settings.js')

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
  },
  components: {
    'Vssue': VssueComponent,
  },
  data() {
    return {
      options: { ...commentOptions, api: GithubV3 }
    }
  },
}
</script>