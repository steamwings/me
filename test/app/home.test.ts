import { expect } from 'chai';
import { describe, it } from 'mocha';
import { render } from '@testing-library/react';
import React from 'react';
import Home from '../../app/home';

describe('Home Component Tests', () => {
  it('should render my name', () => {
    const { getByText } = render(React.createElement(Home));
    expect(getByText('Living like Jesus')).to.exist;
  });

  it('should have a link to the blog', () => {
    const { getByText } = render(React.createElement(Home));
    const blogLink = getByText('Blog');
    expect(blogLink).to.exist;
    expect(blogLink.closest('a')).to.have.attribute('href', '/blog');
  });

  // ...additional tests for home component...
});
