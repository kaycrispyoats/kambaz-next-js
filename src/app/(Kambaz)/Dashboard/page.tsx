import Link from "next/link";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard" style={{ padding: "20px" }}>
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2>
      <hr />

      <div
        id="wd-dashboard-courses"
        style={{
          paddingTop: "35px",
          paddingBottom: "35px",
          paddingLeft: "125px", // space from sidebar
        }}
      >
        <Row className="g-4 justify-content-start">

          <Col xs="auto" className="d-flex justify-content-center">
            <Card style={{ width: "300px" }}>
            <Link href="/Courses/1234/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
              <CardBody>
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle>
              <CardText style={{ height: "100px" }}>
                 Full Stack software developer
              </CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
          </Link>
          </Card>
          </Col>

          <Col xs="auto" className="d-flex justify-content-center">
            <Card style={{ width: "300px" }}>
            <Link href="/Courses/1234/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
             <CardImg variant="top" src="/images/banana.jpg" width="100%" height={160} />
             <CardBody>
             <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">C23456 Banana Physics</CardTitle>
             <CardText style={{ height: "100px" }}>
               The wonderful world of banana movement laws
              </CardText>
               <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
          </Col>

          <Col xs="auto" className="d-flex justify-content-center">
            <Card style={{ width: "300px" }}>
          <Link href="/Courses/1234/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/trampoline.jpg" width="100%" height={160} />
              <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">C7890 Trampoline Flavors</CardTitle>
            <CardText style={{ height: "100px" }}>
               The 64 flavors of trampolines and their impact on societal taste
               </CardText>
              <Button variant="primary">Go</Button>
             </CardBody>
            </Link>
        </Card>
          </Col>

          {/* Course 4 */}
          <Col xs="auto" className="d-flex justify-content-center">
            <Card style={{ width: "300px" }}>
           <Link href="/Courses/1234/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/seashell.jpg" width="100%" height={160} />
            <CardBody>
               <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">C10111 Seashell music</CardTitle>
              <CardText style={{ height: "100px" }}>
                The global use of seashell instruments
               </CardText>
              <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
        </Card>
          </Col>

          <Col xs="auto" className="d-flex justify-content-center">
            <Card style={{ width: "300px" }}>
             <Link href="/Courses/1234/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
             <CardImg variant="top" src="/images/crayons.jpg" width="100%" height={160} />
            <CardBody>
               <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">C13141 Crayon theory</CardTitle>
               <CardText style={{ height: "100px" }}>
               Are crayons really wax?
               </CardText>
           <Button variant="primary">Go</Button>
            </CardBody>
           </Link>
            </Card>
          </Col>

          {/* Course 6 */}
          <Col xs="auto" className="d-flex justify-content-center">
            <Card style={{ width: "300px" }}>
          <Link href="/Courses/1234/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
             <CardImg variant="top" src="/images/sonic.jpg" width="100%" height={160} />
             <CardBody>
             <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">C16171 Sonic Sez</CardTitle>
              <CardText style={{ height: "100px" }}>
             Thats no good!
             </CardText>
               <Button variant="primary">Go</Button>
             </CardBody>
           </Link>
        </Card>
          </Col>

          {/* Course 7 */}
          <Col xs="auto" className="d-flex justify-content-center">
            <Card style={{ width: "300px" }}>
            <Link href="/Courses/1234/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/free.jpg" width="100%" height={160} />
            <CardBody>
               <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">C19202 Nothing</CardTitle>
               <CardText style={{ height: "100px" }}>
                 Absolutely nothing. Free credits.
               </CardText>
              <Button variant="primary">Go</Button>
             </CardBody>
           </Link>
         </Card>
          </Col>

          {/* Course 8 */}
          <Col xs="auto" className="d-flex justify-content-center">
            <Card style={{ width: "300px" }}>
              <Link href="/Courses/1234/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
        <CardImg variant="top" src="/images/tired.jpg" width="100%" height={160} />
                <CardBody>
               <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">C222 Running out of ideas</CardTitle>
              <CardText style={{ height: "100px" }}>
                 I want to nap...
              </CardText>
          <Button variant="primary">Go</Button>
             </CardBody>
          </Link>
         </Card>
      </Col>
    </Row>
      </div>
    </div>
  );
}
