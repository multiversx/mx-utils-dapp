import * as React from 'react';
import { Card } from 'react-bootstrap';
import Base64ToDecimal from './components/Base64ToDecimal';
import Base64ToHex from './components/Base64ToHex';
import Base64ToString from './components/Base64ToString';
import BechToHexAddress from './components/BechToHexAddress';
import DecimalToBase64 from './components/DecimalToBase64';
import DecimalToHex from './components/DecimalToHex';
import FormatAmount from './components/FormatAmount';
import HexToBase64 from './components/HexToBase64';
import HexToBechAddress from './components/HexToBechAddress';
import HexToDecimal from './components/HexToDecimal';
import HexToString from './components/HexToString';
import ParseAmount from './components/ParseAmount';
import StringToBase64 from './components/StringToBase64';
import StringToHex from './components/StringToHex';

const Converters = () => {
  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 col-md-10 mx-auto'>
          <div className='card shadow-sm rounded border-0'>
            <div className='card-body p-1'>
              <div className='card rounded border-0 bg-primary'>
                <div className='card-body text-center p-4 text-light'>
                  Converters
                </div>
              </div>
              <Card className='m-5'>
                <Card.Header>Addresses</Card.Header>
                <Card.Body>
                  <BechToHexAddress />
                  <hr />
                  <HexToBechAddress />
                </Card.Body>
              </Card>

              <Card className='m-5'>
                <Card.Header>Numeric</Card.Header>
                <Card.Body>
                  <DecimalToHex />
                  <hr />
                  <HexToDecimal />
                  <hr />
                  <DecimalToBase64 />
                  <hr />
                  <Base64ToDecimal />
                </Card.Body>
              </Card>

              <Card className='m-5'>
                <Card.Header>Ammount Formatting</Card.Header>
                <Card.Body>
                  <ParseAmount />
                  <hr />
                  <FormatAmount />
                </Card.Body>
              </Card>

              <Card className='m-5'>
                <Card.Header>String converters</Card.Header>
                <Card.Body>
                  <StringToHex />
                  <hr />
                  <HexToString />
                  <hr />
                  <StringToBase64 />
                  <hr />
                  <Base64ToString />
                  <hr />
                  <HexToBase64 />
                  <hr />
                  <Base64ToHex />
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converters;
