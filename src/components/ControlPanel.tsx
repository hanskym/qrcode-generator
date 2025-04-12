import * as React from 'react';

import { Link } from 'react-router';

import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Input } from '@heroui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { Select, SelectItem } from '@heroui/select';
import Sketch from '@uiw/react-color-sketch';
import { QRCodeCanvas } from 'qrcode.react';

import { Icons } from '@/components/Icons';

import { siteConfig } from '@/config/site';
import { saveToClipboard, saveToPDF, saveToPNG } from '@/lib/export';

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
          <Link className="w-fit text-base" to="/">
            {siteConfig.name}
          </Link>
          <p className="text-small text-default-500">{siteConfig.description}</p>
        </div>
      </CardHeader>
      <CardBody className="my-4">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-full space-y-4 md:col-span-4">
            <div className="flex items-center gap-2">
              <Icons.link className="size-6" />
              <h2 className="text-xl font-semibold">URL</h2>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-default-500">Enter your link URL.</p>
              <Input
                id="url"
                name="url"
                label="URL"
                type="text"
                placeholder="https://www.google.com"
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
                          try {
                            const text = await navigator.clipboard.readText();
                            setUrl(text);
                          } catch (err) {
                            console.error('Clipboard read failed:', err);
                            alert('Clipboard access not available on this device.');
                          }
                        }}
                      >
                        <Icons.clipboard className="size-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>Paste Clipboard</PopoverContent>
                  </Popover>
                }
              />
            </div>

            <div className="flex items-center gap-2">
              <Icons.swatch className="size-6" />
              <h2 className="text-xl font-semibold">Color</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  id="foreground"
                  name="foreground"
                  label="Foreground"
                  type="text"
                  placeholder="#000000"
                  value={fgColor}
                  onChange={(e) => {
                    let value = e.target.value.trim();

                    if (!value.startsWith('#')) {
                      value = '#' + value;
                    }

                    const isValidHex = /^#([0-9A-Fa-f]{0,6})$/.test(value);
                    if (isValidHex) {
                      setFgColor(value);
                    }
                  }}
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
                          disableAlpha
                        />
                      </PopoverContent>
                    </Popover>
                  }
                />
              </div>

              <div className="space-y-2">
                <Input
                  id="background"
                  name="background"
                  label="Background"
                  type="text"
                  placeholder="#FFFFFF"
                  value={bgColor}
                  onChange={(e) => {
                    let value = e.target.value.trim();

                    if (!value.startsWith('#')) {
                      value = '#' + value;
                    }

                    const isValidHex = /^#([0-9A-Fa-f]{0,6})$/.test(value);
                    if (isValidHex) {
                      setBgColor(value);
                    }
                  }}
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
                          disableAlpha
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
                <h2 className="text-xl font-semibold">Settings</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Select
                    id="errorCorrection"
                    name="errorCorrection"
                    label="Error Correction"
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
                    id="size"
                    name="size"
                    label="Size"
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

          <div className="col-span-full md:col-span-2">
            <div className="flex h-full flex-col gap-4">
              <div
                ref={canvasRef}
                className="flex items-center justify-center rounded-2xl bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] p-4 [background-size:16px_16px]"
              >
                <QRCodeCanvas
                  size={200}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  value={url || 'https://www.google.com'}
                  level={errorCorrection}
                />
              </div>

              <div className="mt-auto space-y-4">
                <div className="flex items-center gap-2">
                  <Icons.share className="size-6" />
                  <h2 className="text-xl font-semibold">Export</h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    className="bg-blue-600 font-medium text-white"
                    startContent={<Icons.clipboardCopy className="size-4" />}
                    onClick={() => saveToClipboard(canvasRef)}
                  >
                    Clipboard
                  </Button>
                  <Button
                    className="bg-green-600 font-medium text-white"
                    startContent={<Icons.fileImage className="size-4" />}
                    onClick={() => saveToPNG(canvasRef, size, url)}
                  >
                    PNG
                  </Button>
                  <Button
                    className="bg-red-600 font-medium text-white"
                    startContent={<Icons.file className="size-4" />}
                    onClick={() => saveToPDF(canvasRef, url)}
                  >
                    PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="flex items-center justify-between gap-2">
        <p className="text-center text-sm text-default-500 sm:text-left">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>

        <a
          className="flex items-center justify-center transition-all duration-300 hover:text-default-500/80"
          href="https://github.com/hanskym/qrcode-generator"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="QR Code Generator GitHub Repository"
        >
          <Icons.github className="size-4 md:mr-1" />
          <span className="hidden text-sm md:block">GitHub</span>
        </a>
      </CardFooter>
    </Card>
  );
}
