const fs = require('fs')

const msgFile = process.argv[2]
const commitMsg = fs.readFileSync(msgFile, 'utf-8').trim()

const pattern = /^(feat|fix|docs|style|refactor|perf|test|chore)\(#\d+\): .+ - .+/

console.log(`\n🔍 Checking... \n Your commit message ${commitMsg}`)

if (!pattern.test(commitMsg)) {
  console.error('\n❌ Invalid commit message format.')
  console.error('Expected: action(issue_number): feature - message')
  console.error('Example: feat(23): hooks - update useTheme hooks to allow light theme\n')
  process.exit(1)
}

console.log('✅ Commit message format is valid.')
