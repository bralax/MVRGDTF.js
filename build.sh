set -e
set -x

# Xerces-C - prepare
# mkdir xerces-c
cd xerces-c
# curl -o xerces-c.zip https://dlcdn.apache.org/xerces/c/3/sources/xerces-c-3.3.0.zip
# tar -xf xerces-c.zip --strip-components=1

#Xerces-C - build
emconfigure ./configure --disable-shared --prefix=$(pwd)/_build_mac_x64 --enable-xmlch-uint16_t
make -j
make install

# libMVRGdtf - build x64 [NO-MZ] (this should produce arm/x64 libraries)
cd ../
mkdir build
cd build
emmake /opt/homebrew/Cellar/cmake/3.31.6/bin/cmake ../ -DCMAKE_CXX_COMPILER_TARGET="wasm64-unknown-emscripten"  
make -j
make install
