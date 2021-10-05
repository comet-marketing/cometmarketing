import React, { Component } from 'react';
import { withRouter } from 'next/router'
import Layout from '../components/Layout';
import fetch from 'node-fetch';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import ProjectCredits from '../components/ProjectCredits';
import BreadcrumbRow from '../components/Breadcrumb';

class Photoproject extends Component {
  constructor(){
    super();
    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  static async getInitialProps({query}) {
    const res = await fetch(`https://utdcmpatch.herokuapp.com/photoprojects/?slug=${query.slug}`)
    const data = await res.json()
    return {
      project: data[0]
    }
  }

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  render() {
    const galleryPhotos = this.props.project.photos.map((photo, i) => {
      return {
        src: photo.url,
        width: 3,
        height: 2,
        alt: photo.name
      }
    })
    return(
      <Layout pageName={this.props.project.title} title={this.props.project.title} description={this.props.project.description.substring(0,70)} keywords={'Comet Marketing,UTD,photography,' + this.props.project.title}>
        <Container>
          <BreadcrumbRow parentHref="/portfolio" parentText="Portfolio" activeText={this.props.project.title}>
          </BreadcrumbRow>
          <Row className='justify-content-center'>
            <Col sm='8'>
              <p className='lead'>{this.props.project.description}</p>
            </Col>
          </Row>
          <ProjectCredits members={this.props.project.members} date={this.props.project.date}></ProjectCredits>
          <Gallery photos={galleryPhotos} onClick={this.openLightbox} />
          <Lightbox images={galleryPhotos}
            onClose={this.closeLightbox}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
          />
        </Container>
      </Layout>
    )
  }
}

export default withRouter(Photoproject);