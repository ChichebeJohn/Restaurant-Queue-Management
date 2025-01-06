import Image from 'next/image';
import Link from 'next/link';

export default function SignIn() {
  return (
    <div className="signin">
      <div className="wrapper">
        <div className="left-border"></div>
        <div className="content">
          <p>To Continue please input a valid email address.</p>

          <form action="/submit-email" method="POST" className="email-form">
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
          </form>

          <div className="image-container">
            <Image src="/menu.png" alt="Menu" width={500} height={500} />
          </div>
        </div>
        <div className="right-border"></div>
      </div>

      <Link href="/menu" passHref>
        <button className="view-menu-btn">View Menu</button>
      </Link>
    </div>
  );
}
