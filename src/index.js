import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/app/app'
import './index.css'

const container = createRoot(document.getElementById('root'))
container.render(<App />)
