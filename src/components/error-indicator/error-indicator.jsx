import React from 'react'
import { Alert, Space } from 'antd'

import './error-indicator.css'

const ErrorIndicator = () => {
  return (
    <Space direction="vertical" className="alert-block">
      <Alert
        message="Error"
        description="Failed to download data from the server"
        type="error"
        showIcon
        className="alert-content"
      />
    </Space>
  )
}

export default ErrorIndicator
