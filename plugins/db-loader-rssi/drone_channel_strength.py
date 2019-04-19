#!/usr/bin/env python

#    Copyright 2011,2012 Erik Persson
#
#    This file is part of the cell-sync-usrp project.
#
#    cell-sync-usrp is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    cell-sync-usrp is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with cell-sync-usrp.  If not, see <http://www.gnu.org/licenses/>.


##################################################
# Gnuradio Python Flow Graph
# Title: Top Block
# Generated: Wed Mar 30 09:06:37 2011
##################################################
from __future__ import print_function

from gnuradio import analog
from gnuradio import eng_notation
from gnuradio import gr
from gnuradio import uhd
from gnuradio import blocks
from gnuradio import filter
from gnuradio import fft
from gnuradio.fft import window
from gnuradio.eng_option import eng_option

import wx
import osmosdr

import time, sys

NUMBER_OF_SAMPLES = 256
SAMPLE_RATE = 0.1e6
FLUSH_NUM_SAMPLES = 20

# All the channels we want to sample
CHANNELS = [
    ("TVWS-2", 57),
    ("TVWS-3", 63),
    ("TVWS-4", 69),  # assigned gap
    ("TVWS-5", 79),
    ("TVWS-6", 85),
    ("TVWS-7", 177),  # VHF starts here
    ("TVWS-8", 183),
    ("TVWS-9", 189),
    ("TVWS-10", 195),
    ("TVWS-11", 201),
    ("TVWS-12", 207),
    ("TVWS-13", 213),
    ("TVWS-14", 473),  # UHF starts here
    ("TVWS-15", 479),
    ("TVWS-16", 485),
    ("TVWS-17", 491),  # SYL tower setting
    ("TVWS-18", 497),  # SYL tower setting
    ("TVWS-19", 503),  # observed near SYL tower
    ("TVWS-20", 509),
    ("TVWS-21", 515),  # reserved for radio?
    ("TVWS-22", 521),
    ("TVWS-23", 527),
    ("TVWS-24", 533),
    ("TVWS-25", 539),
    ("TVWS-26", 545),
    ("TVWS-27", 551),
    ("TVWS-28", 557),
    ("TVWS-29", 563),
    ("TVWS-30", 569),
    ("TVWS-31", 575),
    ("TVWS-32", 581),
    ("TVWS-33", 587),
    ("TVWS-34", 593),
    ("TVWS-35", 599),
    ("TVWS-36", 605),
    ("TVWS-38", 617),
    ("TVWS-39", 623),
    ("TVWS-40", 629),
    ("TVWS-41", 635),
    ("TVWS-42", 641),
    ("TVWS-43", 647),
    ("TVWS-44", 653),
    ("TVWS-45", 659),
    ("TVWS-46", 665),
    ("TVWS-47", 671),
    ("TVWS-48", 677),
    ("TVWS-49", 683),
    ("TVWS-50", 689),
    ("TVWS-51", 695),
    ("LTE-TMOB", 731.5),  # T-Mobile: Band 12
    ("LTE-ATT", 739),  # ATT: Band 17
    ("LTE-VERZ", 751),  # Verizon: Band 13
	
	#Santa Yzabel
    (" LTE-VERZ",  1942.5),	#Verizon: Band 4
    (" LTE-TMOB",  1955  ),	#T-Mobile: Band 2
    (" LTE-TMOB",  2120  ),	#T-Mobile: Band 4
    (" LTE-VER",  2147.5)	#Verizon: Band 4
	
	#Coal oil point
	#("LTE-UNKN", 738.8),
	#("LTE-UNKN", 739.2),
	#("LTE-UNKN", 1936.9),
	#("LTE-UNKN", 1957.5),
	#("LTE-UNKN", 1972.9),
	#("LTE-UNKN", 1985),
	#("LTE-UNKN", 1992.5),
	#("LTE-UNKN", 1992.7),
	#("LTE-UNKN", 2145),
	#("LTE-UNKN", 2145.2),
	#("LTE-UNKN", 2145.3),
]


class topBlock(gr.top_block):

    def __init__(self):
        print("top block initiated")
        gr.top_block.__init__(self, "Channel Sensing")

        ##################################################
        # Variables
        ##################################################
        self.samp_rate = SAMPLE_RATE
        self.freq = 106.3e6

        ##################################################
        # Blocks
        ##################################################
        self.rtlsdr_source_0 = osmosdr.source(args="numchan=1 ")
        self.rtlsdr_source_0.set_sample_rate(self.samp_rate)
        self.rtlsdr_source_0.set_center_freq(self.freq, 0)
        self.rtlsdr_source_0.set_freq_corr(0, 0)
        self.rtlsdr_source_0.set_dc_offset_mode(0, 0)
        self.rtlsdr_source_0.set_iq_balance_mode(0, 0)
        self.rtlsdr_source_0.set_gain_mode(False, 0)
        self.rtlsdr_source_0.set_gain(20, 0)
        self.rtlsdr_source_0.set_if_gain(0, 0)
        self.rtlsdr_source_0.set_bb_gain(0, 0)
        self.rtlsdr_source_0.set_antenna("", 0)
        self.rtlsdr_source_0.set_bandwidth(3e6, 0)

        self.blocks_rms_xx_0_sdr = blocks.rms_cf(0.001)
        self.blocks_nlog10_ff_0_sdr = blocks.nlog10_ff(20, 1, 0)
        self.blocks_probe_signal_x_0_sdr = blocks.probe_signal_f()

        self.blocks_stream_to_vector_0_sdr = blocks.stream_to_vector(gr.sizeof_gr_complex * 1, NUMBER_OF_SAMPLES)
        self.blocks_probe_signal_vx_0_sdr = blocks.probe_signal_vc(NUMBER_OF_SAMPLES)

        ##################################################
        # Connections
        ##################################################

        # RTL connection
        self.connect((self.rtlsdr_source_0, 0), (self.blocks_rms_xx_0_sdr, 0))
        self.connect((self.blocks_rms_xx_0_sdr, 0), (self.blocks_nlog10_ff_0_sdr, 0))
        self.connect((self.rtlsdr_source_0, 0), (self.blocks_stream_to_vector_0_sdr, 0))
        self.connect((self.blocks_stream_to_vector_0_sdr, 0), (self.blocks_probe_signal_vx_0_sdr, 0))
        self.connect((self.blocks_nlog10_ff_0_sdr, 0), (self.blocks_probe_signal_x_0_sdr, 0))

    def get_samp_rate(self):
        return self.samp_rate

    def set_samp_rate(self, samp_rate):
        self.samp_rate = samp_rate
        self.rtlsdr_source_0.set_sample_rate(self.samp_rate)

    def get_freq(self):
        return self.freq

    def set_freq(self, frequency):
        self.freq = frequency
        self.rtlsdr_source_0.set_center_freq(self.freq, 0)


if __name__ == '__main__':

    if len(sys.argv) < 2:
        filename = "Channel_Strength_RTL_%i.csv" % time.time()
    else:
        filename = sys.argv[1]

    print("Starting RTL Reader")
    print("Saving to %s" % filename)

    readings_file = open(filename, 'w')
    readings_file.write("Time,Frequency,Signal_Strength\n")

    tb = topBlock()
    tb.start()

    header_labels = "\t\t"
    header_freq = "\t\t"

    for channel in CHANNELS:
        chLabel, freq = channel
        header_labels += chLabel + "\t\t"
        header_freq += "%0.1f MHz\t" % freq

    print("Beginning Channel Strength Scan")
    print(header_labels)
    print(header_freq)

    try:
        # loop forever iterating through channel list, saving readings
        while True:
            line = "%i\t" % time.time()
            for channel in CHANNELS:
                chLabel, freq = channel

                if freq > 700:  # LTE BAND
                    tb.set_freq(freq * 1e6)
                else:  # TVWS Band
                    tb.set_freq((freq - 3.0 + 0.309) * 1e6)

                signal_strength = tb.blocks_probe_signal_x_0_sdr.level()

                # write RTL-SDR reading
                line += "%f db\t" % signal_strength
                readings_file.write("%f,%0.3f,%f\n" % (time.time(), tb.get_freq() / 1e6, signal_strength))

            readings_file.flush()
            print(line, end='\r')

    except KeyboardInterrupt:
        print("\n\nEnding Sampling")

        readings_file.close()
        tb.stop()
