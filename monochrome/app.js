
class NewsLatterForm extends React.Component {

  state = {
    email:'',
    formMessage: '',
    busy: false,
    successMessage: '',
  }

  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  onSubmit = (e) =>{
    e.preventDefault();
    const email = this.state.email;
    console.log(email)

    this.setState({
      email:''
    })

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

  }

  onInputChange = (e) =>{
    this.setState({
      email: e.target.value
    })

  }

  render() {
    const isSubmitted = this.state.successMessage.trim().length > 0;

    if (isSubmitted) {
      return <div className="container">{this.state.successMessage}</div>;
    }
    return (
      <form action="" method="post" onSubmit={this.onSubmit}>
        <label htmlFor="email-newsletter">sign up for our newsletter</label>
        <input
          type="text"
          name="email"
          id="email-newsletter"
          value={this.state.email}
          onChange={this.onInputChange}
        />
        <button title="Subcribe" type="submit" disabled={this.state.busy}>
          {this.state.busy ? '...loading' : 'Submit'}
        </button>
        <div className='form-message'>{this.state.formMessage}</div>
      </form>
    );
  }
}

const newsLatterContainer = document.querySelector(
  ".footer-sign-up-newsletter",
);

ReactDOM.createRoot(newsLatterContainer).render(<NewsLatterForm></NewsLatterForm>);
