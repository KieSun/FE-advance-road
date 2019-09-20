import * as React from 'react'

interface LoadingProps {
  size?: 'small' | 'default' | 'large'
  vertical?: Boolean
  color?: string
  text?: string
  toast?: Boolean
  indicator?: React.ReactElement<any>
}

const Loading = (props: LoadingProps) => {
  console.log(props)
  return <div>1</div>
}

export default Loading
