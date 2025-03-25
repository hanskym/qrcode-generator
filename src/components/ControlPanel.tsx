import * as React from 'react';

import { Link } from 'react-router';

import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Input } from '@heroui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { Select, SelectItem } from '@heroui/select';
import { Sketch } from '@uiw/react-color';
import { QRCodeCanvas } from 'qrcode.react';

import { Icons } from '@/components/Icons';

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export default function ControlPanel() {
  const [url, setUrl] = React.useState('');
  const [fgColor, setFgColor] = React.useState('#000000');
  const [bgColor, setBgColor] = React.useState('#FFFFFF');
  const [errorCorrection, setErrorCorrection] = React.useState<ErrorCorrectionLevel>('L');
  const [size, setSize] = React.useState(400);

  const canvasRef = React.useRef<HTMLDivElement>(null);

  return (
    <Card className="size-full md:h-auto">
      <CardHeader className="flex items-center justify-center gap-3 md:justify-start">
        <Icons.logo className="size-10" />
        <div className="flex flex-col">
          <Link className="text-base" to="/">
            QR Code Generator
          </Link>
          <p className="text-small text-default-500">
            Simple React QR Code Generator for creating customizable QR codes.
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-full space-y-4 md:col-span-4">
            <div className="flex items-center gap-2">
              <Icons.link className="size-6" />
              <h2 className="text-xl font-semibold">URL</h2>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-default-500">Masukkan URL tautan anda.</p>
              <Input
                label="URL"
                type="text"
                placeholder="https://www.google.com/"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                endContent={
                  <Popover placement="bottom">
                    <PopoverTrigger>
                      <Button
                        aria-label="Paste Clipboard"
                        size="sm"
                        variant="bordered"
                        isIconOnly
                        onClick={async () => {
                          const text = navigator.clipboard.readText();
                          setUrl(await text);
                        }}
                      >
                        <Icons.clipboard className="size-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>Paste Clipboard</PopoverContent>
                  </Popover>
                }
                isRequired
              />
            </div>

            <div className="flex items-center gap-2">
              <Icons.swatch className="size-6" />
              <h2 className="text-xl font-semibold">Warna</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  label="Foreground"
                  type="text"
                  placeholder="#000000"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  endContent={
                    <Popover>
                      <PopoverTrigger>
                        <Button aria-label="Select Color" size="sm" variant="bordered" isIconOnly>
                          <Icons.palette className="size-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Sketch
                          color={fgColor}
                          onChange={(color) => {
                            setFgColor(color.hex);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  }
                />
              </div>

              <div className="space-y-2">
                <Input
                  label="Background"
                  type="text"
                  placeholder="#FFFFFF"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  endContent={
                    <Popover>
                      <PopoverTrigger>
                        <Button aria-label="Select Color" size="sm" variant="bordered" isIconOnly>
                          <Icons.palette className="size-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Sketch
                          color={bgColor}
                          onChange={(color) => {
                            setBgColor(color.hex);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  }
                />
              </div>
            </div>

            <div className="col-span-full space-y-4 md:col-span-4">
              <div className="flex items-center gap-2">
                <Icons.settings className="size-6" />
                <h2 className="text-xl font-semibold">Pengaturan</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Select
                    label="Koreksi Kode"
                    selectedKeys={[errorCorrection]}
                    onChange={(e) => setErrorCorrection(e.target.value as ErrorCorrectionLevel)}
                  >
                    <SelectItem key="L" textValue="L">
                      L - 7%
                    </SelectItem>
                    <SelectItem key="M" textValue="M">
                      M - 15%
                    </SelectItem>
                    <SelectItem key="Q" textValue="Q">
                      Q - 25%
                    </SelectItem>
                    <SelectItem key="H" textValue="H">
                      H - 30%
                    </SelectItem>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Select
                    label="Ukuran"
                    selectedKeys={[size.toString()]}
                    onChange={(e) => setSize(Number(e.target.value))}
                  >
                    <SelectItem key="200" textValue="200px">
                      200px
                    </SelectItem>
                    <SelectItem key="400" textValue="400px">
                      400px
                    </SelectItem>
                    <SelectItem key="600" textValue="600px">
                      600px
                    </SelectItem>
                    <SelectItem key="800" textValue="800px">
                      800px
                    </SelectItem>
                    <SelectItem key="1000" textValue="1000px">
                      1000px
                    </SelectItem>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full space-y-4 md:col-span-2">
            <div
              ref={canvasRef}
              className="flex items-center justify-center rounded-2xl bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] p-4 [background-size:16px_16px]"
            >
              <QRCodeCanvas
                size={200}
                bgColor={bgColor}
                fgColor={fgColor}
                value={url}
                level={errorCorrection}
              />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold">Ekspor</h2>
              <Button
                className="bg-blue-600 font-medium text-white"
                startContent={<Icons.clipboardCopy className="size-4" />}
                fullWidth
              >
                Salin Clipboard
              </Button>
              <Button
                className="bg-green-600 font-medium text-white"
                startContent={<Icons.fileImage className="size-4" />}
                fullWidth
              >
                Gambar PNG
              </Button>
              <Button
                className="bg-red-600 font-medium text-white"
                startContent={<Icons.file className="size-4" />}
                fullWidth
              >
                File PDF
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <p className="text-sm text-default-500">
          &copy; {new Date().getFullYear()} QR Code Generator. All rights reserved.
        </p>
      </CardFooter>
    </Card>
  );
}
