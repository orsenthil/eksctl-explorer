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
    <a href="https://senthil.learntosolveit.com" target="_blank" rel="noopener noreferrer">Senthil Kumaran</a>{' '}
    </p>
    <p className="footer__copyright dark-white">
        <a href="https://github.com/orsenthil/eksctl-explorer/blob/main/CREDITS.md" target="_blank" rel="noopener noreferrer">Credits.</a>
    </p>

  </footer>
);

Footer.propTypes = {
  dark: PropTypes.bool
};

export { Footer };
