import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt={""} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
  <Link href="/Courses/23456" className="wd-dashboard-course-link">
    <Image src="/images/reactjs.jpg" width={200} height={150} alt="Banana Physics" />
    <div>
      <h5> C23456 Banana Physics </h5>
      <p className="wd-dashboard-course-title">
        The wonderful word of banana movement laws
      </p>
      <button> Go </button>
    </div>
  </Link>
</div>
        <div className="wd-dashboard-course"> 
            <Link href="/Courses/23456" className="wd-dashboard-course-link">
    <Image src="/images/reactjs.jpg" width={200} height={150} alt="Banana Physics" />
    <div>
      <h5> C78910 Trampoline Flavors </h5>
      <p className="wd-dashboard-course-title">
        The 64 flavors of trampolines and their impact on societal taste
      </p>
      <button> Go </button>
    </div>
  </Link> 
  </div>
  <div className="wd-dashboard-course"> 
            <Link href="/Courses/23456" className="wd-dashboard-course-link">
    <Image src="/images/reactjs.jpg" width={200} height={150} alt="Banana Physics" />
    <div>
      <h5> C101112 Seashell music </h5>
      <p className="wd-dashboard-course-title">
        The global use of seashell instruments
      </p>
      <button> Go </button>
    </div>
  </Link> 
  </div>
  <div className="wd-dashboard-course"> 
            <Link href="/Courses/23456" className="wd-dashboard-course-link">
    <Image src="/images/reactjs.jpg" width={200} height={150} alt="Banana Physics" />
    <div>
      <h5> C131415 Crayon theory </h5>
      <p className="wd-dashboard-course-title">
        Are crayons really wax?
      </p>
      <button> Go </button>
    </div>
  </Link> 
  </div>
  <div className="wd-dashboard-course"> 
            <Link href="/Courses/23456" className="wd-dashboard-course-link">
    <Image src="/images/reactjs.jpg" width={200} height={150} alt="Banana Physics" />
    <div>
      <h5> C161718 Sonic Sez </h5>
      <p className="wd-dashboard-course-title">
        Thats no good!
      </p>
      <button> Go </button>
    </div>
  </Link> 
  </div>
  <div className="wd-dashboard-course"> 
            <Link href="/Courses/23456" className="wd-dashboard-course-link">
    <Image src="/images/reactjs.jpg" width={200} height={150} alt="Banana Physics" />
    <div>
      <h5> C192021 Nothing </h5>
      <p className="wd-dashboard-course-title">
        Absolutely nothing. Free credits.
      </p>
      <button> Go </button>
    </div>
  </Link> 
  </div>
  <div className="wd-dashboard-course"> 
            <Link href="/Courses/23456" className="wd-dashboard-course-link">
    <Image src="/images/reactjs.jpg" width={200} height={150} alt="Banana Physics" />
    <div>
      <h5> C222324 Running out of ideas</h5>
      <p className="wd-dashboard-course-title">
        I want to nap...
      </p>
      <button> Go </button>
    </div>
  </Link> 
  </div>
      </div>
    </div>
);}
