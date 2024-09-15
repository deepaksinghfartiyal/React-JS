import '../css/pagenotFound.css'

function NoPage()
{
return(
    <div class="error-container">
    <div class="error-code">404</div>
    <div class="error-message">Oops! Page not found.</div>
    <p>Sorry, but the page you are looking for might be in another castle.</p>
    <p>Return to <a href="/" class="error-back-link">homepage</a>.</p>
  </div>
)
}

export default NoPage;