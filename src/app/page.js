import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <header className="welcome">
        <h1 className="welcome-text">WELCOME TO </h1>
        <h1 className="highway">The</h1>
        <h1 className="highway">Highway</h1>
        <h1 className="bistro"> Bistro</h1>
      </header>
      
      <div className="image-container">
        <Image src="/burger.png" alt="Burger" width={500} height={500} />
        <Link href="/signIn" passHref>
          <button className="btn">Order Now</button>
        </Link>
      </div>
    </>
  );
}
