import { CTA, Footer, Header, Hero } from 'components';
import Head from 'next/head';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Link from 'next/link';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`query{ 
        pages(where: {id: 810}) {
          nodes {
            seo {
              title
              description
              canonicalUrl
              focusKeywords
              openGraph {
                image {
                  url
                }
              }
            }
            Kamloops {
                  thirdApplyStepTitle
                  secondApplyStepTitle
                  secondApplyStepDescription
                  productsTitle
                  productsRightText
                  productsLeftText
                  firstApplyStepTitle
                  brokerTitle
                  brokerDescription
                  bannerTitle
                  bannerHeading
                  bannerDescription
                  aboutText
                  aboutImage {
                    altText
                    sourceUrl
                  }
                  bannerImage {
                    altText
                    sourceUrl
                  }
                  brokerLink {
                    url
                    title
                  }
                  productsImage {
                    altText
                    sourceUrl
                  }
                  renovation {
                    title
                    description
                  }
                  slider {
                    title
                    content
                  }
                }
          }
        }
    
  
  
        settingsOptions {
        AsimOptions {
          headerSettings {
            uploadLogo {
              sourceUrl
              altText
            }
          }
          footerSettings {
          socialUrl {
            facebook
            tiktok
            linkedin
            instagram
          }
          copyrightText
          footerLeftWidget {
            title
            phoneNumber
            emailAddress
          }
          footerLogoSection {
            logoText
            logoUpload {
              altText
              sourceUrl
            }
          }
          footerRightWidget {
            title
            address
          }
        }
     
        }
      }
  
      menus(where: {location: PRIMARY}) {
        nodes {
          name
          slug
          menuItems(first: 50){
            nodes {
              url
              target
              parentId
              label
              cssClasses
              description
              id
              childItems {
                nodes {
                  uri
                  label
                }
              }
            }
          }
        }
      }
    }`,
  });

  return {
    props: {
      kamloopsData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
  };
}

type MyProps = {
  kamloopsData: any;
  metaData: any;
  settings: any;
  mainMenus: any;

};


const Kamloops = (props: MyProps) => {

  const { settings, mainMenus, kamloopsData, metaData } = props;
  const [key, setKey] = useState(null);


  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }


  return (
    <>
      {kamloopsData?.map((data, index) => {
        return (
          <div key={index} className='Bc-Coquitlam'>
            <Head>
              {metaData.map((meta) => {
                return (
                  <>
                    <title>{meta?.seo?.title}</title>
                    <meta name="description" content={meta?.seo?.description} />
                    <link rel="canonical" href={meta?.seo?.canonicalUrl} />
                    <meta property="og:title" content={meta?.seo?.title} />
                    <meta property="og:description" content={meta?.seo?.description} />
                    <meta property="og:image" content={meta?.seo?.openGraph?.image?.url} />
                  </>
                )
              })}
            </Head>
            <Header settings={settings} mainMenus={mainMenus} />
            <main className="content">
              {data?.Kamloops?.bannerTitle == null ? "" : (
                <Hero
                  title={data?.Kamloops?.bannerTitle}
                  heading={data?.Kamloops?.bannerHeading}
                  description={data?.Kamloops?.bannerDescription}
                  bgImage={data?.Kamloops?.bannerImage?.sourceUrl}
                />
              )}

              <Container className='my-5'>
                <Row className='refinance-text my-5'>
                  <Col md={5}>
                    <p>{data?.Kamloops?.bannerTitle?.split(" ")[0]} <span>{data?.Kamloops?.bannerTitle?.split(" ")[1]}</span></p>
                  </Col>
                  <Col md={7}>
                    <span>{data?.Kamloops?.bannerDescription}</span>
                  </Col>
                </Row>
                <Row className='coquitlam-grid my-5'>
                  <Col md={7}>
                    <div dangerouslySetInnerHTML={{ __html: data?.Kamloops?.aboutText }} >
                    </div>
                  </Col>
                  <Col md={5}>
                    <Image
                      src={data?.Kamloops?.aboutImage?.sourceUrl}
                      loader={myLoader}
                      alt={data?.Kamloops?.aboutImage?.altText}
                      width="100%"
                      height="120"
                      layout="responsive"
                      objectFit="contain"
                    />
                  </Col>
                </Row>
                {data?.Kamloops?.slider == null ? "" : (
                  <Row className='application-slider'>

                    <Carousel
                      autoPlay={true}
                      infinite={true}
                      responsive={responsive}
                    >

                      {data?.Kamloops?.slider.map((slide, a) => {
                        return (
                          <div key={a} className="application-slide text-center">
                            <span>{slide?.title}</span>
                            <p>{slide?.content}</p>
                          </div>
                        )
                      })}

                    </Carousel>
                  </Row>
                )}

                <Row className="product-service">
                  <Col className='mb-5' md={12}>
                    <h2 className='text-center'>{data?.Kamloops?.productsTitle}</h2>
                  </Col>
                  <Col md={3}>
                    <span
                      dangerouslySetInnerHTML={{ __html: data?.Kamloops?.productsLeftText }}
                    ></span>

                  </Col>
                  <Col md={6}>
                    <Image
                      src={data?.Kamloops?.productsImage?.sourceUrl}
                      loader={myLoader}
                      alt={data?.Kamloops?.productsImage?.altText}
                      width="190"
                      height="150"
                      layout="responsive"
                      objectFit="contain"
                    />
                  </Col>
                  <Col md={3}>
                    <span
                      dangerouslySetInnerHTML={{ __html: data?.Kamloops?.productsRightText }}
                    ></span>
                  </Col>
                </Row>
                <Row className='apply-step'>
                  <Col md={4}>
                    {data?.Kamloops?.firstApplyStepTitle == null ? "" : (
                      <div className="apply">
                        <span>01</span>
                        <p>{data?.Kamloops?.firstApplyStepTitle}</p>
                        <div className="apply-border">
                        </div>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.Kamloops?.secondApplyStepTitle == null ? "" : (
                      <div className="approved">
                        <span>02</span>
                        <p>
                          <span>{data?.Kamloops?.secondApplyStepTitle}</span>
                        </p>
                        <p>{data?.Kamloops?.secondApplyStepDescription}</p>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.Kamloops?.thirdApplyStepTitle == null ? "" : (
                      <div className="apply">
                        <span>03</span>
                        <p>{data?.Kamloops?.thirdApplyStepTitle}</p>
                        <div className="apply-border">
                        </div>
                      </div>
                    )}
                  </Col>
                </Row>
                <Row className='mortgage-broker'>
                  <Col>
                    <p className='headering-title'>{data?.Kamloops?.brokerTitle}</p>
                    <p>{data?.Kamloops?.brokerDescription}</p>
                  </Col>
                </Row>
                {data.Kamloops.renovation == null ? "" : (
                  <Row className="renovation-row">
                    <Tabs
                      id="controlled-tab-example"
                      activeKey={key == null ? 1 : key}
                      onSelect={(k) => setKey(k)}
                      className="mb-3 renovation"
                    >
                      {data.Kamloops.renovation.map((tab, item) => {
                        return (
                          <Tab key={item} eventKey={item.toString()} title={tab.title}>
                            <div
                              dangerouslySetInnerHTML={{ __html: tab.description }}
                              className="renovation-content-list">
                            </div>
                          </Tab>
                        )
                      })}
                    </Tabs>
                  </Row>
                )}
                <Row className='broker-coquitlam'>
                  <Col>
                    <h2>{data?.Kamloops?.
                      brokerTitle}</h2>
                    <p>{data?.Kamloops?.brokerDescription}</p>
                    {data?.Kamloops?.brokerLink == null ? "" : (
                      <Link href={data?.Kamloops?.brokerLink?.url}>
                        <span>
                          Read More <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                      </Link>
                    )}

                  </Col>
                </Row>

              </Container>
              <CTA />
            </main>
            <Footer settings={settings} mainMenus={mainMenus} />

          </div>
        )
      })}

    </>
  );
};

export default Kamloops;