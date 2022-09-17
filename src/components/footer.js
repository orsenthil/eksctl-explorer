import React from 'react';
import PropTypes from 'prop-types';
import github from 'assets/images/github.svg';
import githubGreen from 'assets/images/github-green.svg';

const Footer = props => (
  <footer className="footer">
    <div className="logo">
      <a href="https://github.com/orsenthil/eksctl-explorer" rel="noopener noreferrer" target="_blank">
        {props.dark ? (
          <img src={githubGreen} alt="Github Logo" className="logo--github" />
        ) : (
          <img src={github} alt="Github Logo" className="logo--github" />
        )}
      </a>
    </div>
    <p className="footer__copyright dark-white">
    By <a href="https://senthil.learntosolveit.com" target="_blank" rel="noopener noreferrer">Senthil Kumaran</a>{' '}
    <span role="img" aria-label="pointer">👉</span>
    See Also{' '}
      <a href="https://kubectl.learntosolveit.com/" target="_blank" rel="noopener noreferrer">kubectl-explorer</a>, {' '}
      <a href="https://aws.learntosolveit.com/" target="_blank" rel="noopener noreferrer">aws-explorer</a>, {' '} and {' '}
      <a href="https://www.learntosolveit.com/" target="_blank" rel="noopener noreferrer">Learn To Solve it</a>
    </p>

    <p className="footer__copyright dark-white">
      Thanks to{' '}
      <a href="https://gitexplorer.com/" target="_blank" rel="noopener noreferrer"> GitExplorer</a>, and{' '}
      <a href="https://objectexplorer.netlify.app/" target="_blank" rel="noopener noreferrer"> Javascript Object Explorer.</a>
      <span role="img" aria-label="thank you">🙏</span> 
    </p>

  </footer>
);

Footer.propTypes = {
  dark: PropTypes.bool
};

export { Footer };
