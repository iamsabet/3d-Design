import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import config from "../config/config";
import store from "../store";
import { download } from "../assets";
import { downloadCanvasToImage } from "../config/helpers";
import { reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";

import {
  AIPicker,
  ColorPicker,
  FilePicker,
  Tab,
  CustomButton,
} from "../components";

const Customizer = () => <div>Customizer</div>;

export default Customizer;
