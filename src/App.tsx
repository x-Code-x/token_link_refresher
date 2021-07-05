import { useEffect, useState } from 'react';
import './App.scss';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
// @ts-ignore: Unreachable code error
import file from './links.txt';
import { Button, Container } from 'react-bootstrap';

function App() {
  const [showIframe, setShowIframe] = useState(false);
  const [links, setLinks] = useState<string[]>([]);
  const [currentLink, setCurrentLink] = useState('');
  const [seconds, setSeconds] = useState(10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const icons = [
    {
      title: 'twitter',
      url: 'https://twitter.com/EverRiseToken',
      imgSrc: 'https://3daza35f311kaziryjqcf17s-wpengine.netdna-ssl.com/wp-content/uploads/2021/07/twitter-1.png',
    },
    {
      title: 'instagram',
      url: 'https://www.instagram.com/everrisetoken/',
      imgSrc: 'https://3daza35f311kaziryjqcf17s-wpengine.netdna-ssl.com/wp-content/uploads/2021/07/instagram-1.png',
    },
    {
      title: 'telegram',
      url: 'https://t.me/everriseofficial',
      imgSrc: 'https://3daza35f311kaziryjqcf17s-wpengine.netdna-ssl.com/wp-content/uploads/2021/07/telegram-1.png',
    },
    {
      title: 'reddit',
      url: 'https://www.reddit.com/r/EverRise/',
      imgSrc: 'https://3daza35f311kaziryjqcf17s-wpengine.netdna-ssl.com/wp-content/uploads/2021/07/reddit-1.png',
    },
    {
      title: 'discord',
      url: 'https://discord.com/invite/everrise',
      imgSrc: 'https://3daza35f311kaziryjqcf17s-wpengine.netdna-ssl.com/wp-content/uploads/2021/07/discord.png',
    },
    {
      title: 'bscscan',
      url: 'https://bscscan.com/token/0xc7d43f2b51f44f09fbb8a691a0451e8ffcf36c0a',
      imgSrc:
        'https://3daza35f311kaziryjqcf17s-wpengine.netdna-ssl.com/wp-content/uploads/2021/07/BscScan-logo-circle-1.png',
    },
  ];

  useEffect(() => {
    if (currentIndex === links.length) {
      setCurrentIndex(0);
    }
  }, [links, currentIndex]);

  useEffect(() => {
    if (seconds >= 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      // when time is up, move on to the next index
      // then start the count down again
      setCurrentIndex(currentIndex + 1);
      setCurrentLink(links[currentIndex + 1]);
      setSeconds(10);
    }
  }, [seconds, links, currentIndex]);

  useEffect(() => {
    // const [text, setText) = React.useState();
    // const reader = new FileReader()
    // reader.onload = async (e) => {
    //   const text = (e.target.result)
    //   console.log(text)
    //   alert(text)
    // };
    // reader.readAsText(e.target.files[0])

    fetch(file)
      .then((r) => r.text())
      .then((text) => {
        let arrayOfText = text.split('\r');
        arrayOfText = arrayOfText.slice(0, arrayOfText.length - 1);
        setLinks(arrayOfText);
        setCurrentLink(arrayOfText[0]);
      });
  }, []);

  useEffect(() => {
    if (showIframe) {
      gsap.to('.homepage__iframe', { opacity: 1, width: '80vw', height: '90vh' });
      gsap.to('.homepage__iframe-innerdiv', { opacity: 1 });
    } else {
      gsap.to('.homepage__iframe', { opacity: 0, width: 0, height: 0 });
      gsap.to('.homepage__iframe-innerdiv', { opacity: 0 });
    }
  }, [showIframe]);

  useEffect(() => {
    if (seconds === 0) {
      gsap.to('.homepage__listlink-icon', { transform: 'rotate(150deg)' });
    } else {
      gsap.to('.homepage__listlink-icon', { transform: 'rotate(0deg)' });
    }
  }, [seconds]);

  // translation
  const { t, i18n } = useTranslation(['translation', 'homepage']);
  const changeLanguage = (code: string) => {
    console.log(i18n);
    i18n.changeLanguage(code);
  };

  return (
    <>
      <div className="homepage__iframe-outerdiv">
        <div className="homepage__iframe-innerdiv">
          <div className="homepage__iframe-close-innerdiv">
            <div className="homepage__iframe-close">
              <span className="homepage__iframe-link">
                {t('homepage:link', 'Link')}: {currentLink}
              </span>
              <div className="homepage__listlink-iconbtndiv">
                <span>
                  <div className="homepage__listlink-icon-div">
                    <i className="fas fa-redo-alt homepage__listlink-icon"></i>
                    <div style={{ marginLeft: '0.5rem' }}>{seconds}</div>
                  </div>
                </span>
                <span className="homepage__iframe-close-icon" onClick={() => setShowIframe(false)}>
                  {t('homepage:close', 'Close')} <i className="fas fa-times-circle "></i>
                </span>
              </div>
            </div>
          </div>
          <iframe className="homepage__iframe" src={currentLink} title={currentLink}></iframe>
        </div>
      </div>
      <div className="App">
        <section className="homepage__banner">
          <h2> {t('homepage:contract', 'Contract Address')}: 0xc7d43f2b51f44f09fbb8a691a0451e8ffcf36c0a</h2>
          <Button
            variant="secondary"
            className="homepage__banner-btn"
            onClick={() => {
              if (currentLanguage === 'en') {
                changeLanguage('zh');
                setCurrentLanguage('zh');
              } else {
                changeLanguage('en');
                setCurrentLanguage('en');
              }
            }}
          >
            {t('translation:language', '中文')}
          </Button>
        </section>

        <Container className="homepage__container">
          {/* <div className="homepage__iframe-outerdiv">
            <div className="homepage__iframe-innerdiv">
              <iframe className="homepage__iframe" src={currentLink} title={currentLink}></iframe>
            </div>
          </div> */}
          <section className="homepage__div">
            <section className="homepage__title">
              <div className="homepage__title-image-outerdiv">
                <img
                  className="homepage__title-image"
                  alt="title"
                  src="https://risereward.com/images/Logo_EverRise_light-1280x270.png"
                />
              </div>
              <h3 className="homepage__title-h3"> {t('homepage:title', 'Auto Links Refresher')}</h3>
            </section>

            <section className="homepage__content">
              <div className="homepage__listlink-title-div">
                <h3>{t('homepage:linkTitle', 'List of links')}:</h3>
                <div className="homepage__listlink-icon-div">
                  <i className="fas fa-redo-alt homepage__listlink-icon"></i>
                  <div style={{ marginLeft: '0.5rem' }}>{seconds}</div>
                </div>
              </div>
              <div>
                <ol>
                  {links.map((child, index) => (
                    <li
                      className={`homepage__listlink`}
                      key={`link${index}`}
                      style={{ background: index === currentIndex ? 'rgba(255, 255, 255, 0.1)' : 'transparent' }}
                    >
                      <a href={child} rel="noreferrer" target="_blank" className="homepage__listlink-text">
                        {child}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
              <Button variant="secondary" className="homepage__button" onClick={() => setShowIframe(!showIframe)}>
                {t('homepage:action', 'View Action')}
              </Button>
            </section>
          </section>
        </Container>

        <footer className="homepage__footer">
          <img
            className="homepage__title-image"
            alt="title"
            src="https://risereward.com/images/Logo_EverRise_light-1280x270.png"
          />
          <div className="homepage__footer-icon-outerdiv">
            {icons.map((child, index) => (
              <a key={index} href={child.url} rel="noreferrer" target="_blank">
                <div className="homepage__footer-icon-div">
                  <img
                    loading="lazy"
                    src={child.imgSrc}
                    alt={child.title}
                    title={child.title}
                    className="homepage__footer-icon"
                  />
                </div>
              </a>
            ))}
          </div>
          <div className="homepage__footer-copyright">
            {t('homepage:copyright', 'Copyright')} © 2021 | {t('homepage:footer', 'Developed by Community Volunteer')}
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
