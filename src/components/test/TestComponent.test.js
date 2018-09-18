import React from 'react'
import { shallow } from 'enzyme'
import Blog from './TestComponent'

describe.only('<Blog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'Seppo Kolehmainen',
      likes: 5
    }
    const testFunc = () => {
        console.log('clicked')
    }
    const blogComponent = shallow(<Blog blog={blog} onClick={testFunc}/>)
    const contentDiv = blogComponent.find('.content')
    const likeDiv = blogComponent.find('.likeDiv')
    expect(contentDiv.text()).toContain(`${blog.title} ${blog.author}`)
    expect(likeDiv.text()).toContain(`blog has ${blog.likes} likes`)
  })
})