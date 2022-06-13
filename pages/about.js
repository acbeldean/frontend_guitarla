import Layout from '../components/Layout'
import Image from 'next/image'
import styles from '../styles/About.module.css'

const About = () => {
  return (
    <Layout
      page={'About Us'}
    >
      <main className='contenedor'>
        <h2 className='heading'>About Us</h2>
        <div className={styles.content}>
          <Image
            layout='responsive'
            width={600}
            height={450}
            src='/img/about-us.jpg'
            alt='About us image'
          />
          <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus bibendum interdum aliquam. Pellentesque pulvinar fringilla magna. Praesent in erat ut turpis venenatis aliquet dictum ut dui. Phasellus dignissim non massa vel ullamcorper. Vivamus dapibus sodales mattis. Duis quis fringilla enim. Aenean quam odio, rutrum ut nisl vitae, maximus mollis mi. Phasellus vitae neque tincidunt, commodo purus id, ullamcorper arcu. Vestibulum quis euismod felis.</p>
            <p>Mauris eget blandit turpis. Aliquam vitae est pellentesque, maximus arcu ac, faucibus nisi. Nam fermentum pretium metus, non malesuada nibh semper vel. Nullam vulputate ligula vitae sapien rutrum, eget tristique massa volutpat. Ut egestas, neque quis sollicitudin feugiat, purus mauris tempus risus, nec scelerisque elit lectus scelerisque leo. In gravida dapibus justo, vel mattis odio commodo eu.</p>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default About