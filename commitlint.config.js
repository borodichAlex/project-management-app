module.exports = {
  plugins: ['commitlint-plugin-jira-rules'],
  extends: ['jira'],
  rules: {
    'jira-task-id-case': [0],
    'jira-commit-status-case': [0],
    'jira-task-id-max-length': [2, 'always', 15],
  }
}
