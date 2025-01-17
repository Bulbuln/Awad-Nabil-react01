class NewsletterForm extends React.Component {
  state = {
    email: '',
    formMessage: '',
    busy: false,
    successMessage: '',
  };

  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  // event handlers need "this"
  onSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;

    if (!this.validateEmail(email)) {
      this.setState({
        formMessage: 'Please use a valid email',
      });

      return;
    }

    this.setState({
      busy: true,
      formMessage: '',
    });

    setTimeout(() => {
      this.setState({
        busy: false,
        email: '',
        successMessage: `Emailul ${this.state.email} a fost inscris.`,
      });
    }, 3000);
  };

  // controlled component/input
  onInputChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  // render runs everytime state changes
  render() {
    const isSubmitted = this.state.successMessage.trim().length > 0;

    if (isSubmitted) {
      return <div className="container">{this.state.successMessage}</div>;
    }

    // render must -RETURN- JSX
    return (
      <form className="form-newsletter container" onSubmit={this.onSubmit}>
        <label htmlFor="field-newsletter">
          Subscribe to our <span>newsletter</span>
        </label>

        <input
          type="text"
          name="field-newsletter"
          id="field-newsletter"
          placeholder="vrem sa iesim la pauza =))"
          onChange={this.onInputChange}
          value={this.state.email}
        ></input>

        <button title="Subcribe" type="submit" disabled={this.state.busy}>
          {this.state.busy ? '...loading' : 'Submit'}
        </button>

        <div className="form-message">{this.state.formMessage}</div>
      </form>
    );
  }
}

const newsletterContainer = document.querySelector('.home-newsletter');
// React recipe?

ReactDOM.createRoot(newsletterContainer).render(<NewsletterForm></NewsletterForm>);

class AddCartButton extends React.Component {
  state = {
    added: true,
    busy: false
  }

  onClickHandle = () => {

    this.setState({
      busy:true
    });

    setTimeout(() => {
      this.setState({
        added: !this.state.added,
        busy: false
      })
    }, 2000)
    console.log(this.props.productId)
  }

  render() {
    return <button className={` product-control ${this.state.added ? 'active' : ''}`} 
        onClick={this.onClickHandle}
          type="button"
          disabled={this.state.busy}
          >
      {this.state.added === true ? 'Add to cart' : 'Remove from cart'}
      {this.state.busy? <i className="fas fa-spinner"></i> : ''}
    </button>
  }
}

const productTileControls = document.querySelectorAll('.product-tile-controls')

productTileControls.forEach((productTileControl, index )=> {
  ReactDOM.createRoot(productTileControl).render(<AddCartButton productId={index}></AddCartButton>);
  
});