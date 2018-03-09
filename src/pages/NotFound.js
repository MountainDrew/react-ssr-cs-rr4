import React from 'react';

export default class NotFound extends React.Component {
  constructor(props) {
    super(props);

    if(this.props.staticContext) {
      this.props.staticContext.notFound = true;
    }
  }

  render() {
    return (
      <div>404 - PAGE NOT FOUND</div>
    );
  }
}
