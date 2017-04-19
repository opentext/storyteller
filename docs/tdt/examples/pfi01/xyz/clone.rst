=====
Clone
=====

:Author: Petr Filipsky

Overview
========

This test demonstrates the identity transformation.
If we set the ``enumerate`` keyword to the document node rule then the transformation copies all
the elements specified in the *Data Template* in *Data order*. 


Test case definition
====================

Source Data
-----------

Let's say we have the following input data:

.. code:: xml
   :number-lines:
   :name: source Enumerate

   <data>
     <message>
       <employee>
         <name>John Smelter</name>
         <department>Forestry Department</department>
         <university>Education University</university>
         <address>
           <city>London</city>
           <street>Witham Hall</street>
           <number>100</number>
           <zipcode>1GH 423</zipcode>
         </address>
         <notes>
           <h2>Education</h2>
           <ul>
             <li><strong>2001</strong><br/>
             Ph.D. in Spatial Information Science and Engineering at the University of Maine. </li>
             <li><strong>1997</strong> <br/>
             Master's of Public Administration and Computer Science
             from the Government School of the Joao Pinheiro Foundation, Minas Gerais, Brazil. </li>
             <li><strong>1978</strong> <br/>
             B.S. in Mechanical Engineering from the Catholic University of Minas Gerais, Brazil. </li>
             <li><strong>1977</strong> <br/>
             Advanced Degree in Data Processing Technology from the
             Federal University of Minas Gerais, Brazil. </li>
           </ul>
         </notes>
       </employee>
       <employee>
         <name>John Smith</name>
         <department>Foreign Department</department>
         <university>Foreign University</university>
         <address>
           <street>Williams Hall</street>
           <number>111</number>
           <zipcode>20001-111</zipcode>
           <city>Washington DC</city>
         </address>
         <notes>
           <TABLE BORDER="0" CELLPADDING="0" CELLSPACING="0">
             <TR VALIGN="TOP">
               <TH colspan="2" align="left">1. Education</TH>
             </TR>
             <TR VALIGN="TOP">
               <TD colspan="2" align="left">Catholic University of Leuven, Belgium</TD>
               <TD>Dr. Sc. (MATH)</TD>
               <TD>1979</TD>
             </TR>
             <TR VALIGN="TOP">
               <TD colspan="2" align="left">University of Antwerp, Belgium</TD>
               <TD>'Licentiaat' in Mathematics</TD>
               <TD>1975</TD>
             </TR>
           </TABLE>      
         </notes>
       </employee>
       <employee>
         <name>Stephen Hawking</name>
         <department>Astronomy Department</department>
         <university>University of Cambridge</university>
         <address>
           <street>The Old Schools, Trinity Ln</street>
           <city>Cambridge</city>
           <zipcode>CB2 1TN</zipcode>
         </address>
         <notes>
           <p>
		     Stephen William Hawking was born on 8 January 1942 (300 years after the death of Galileo) 
		     in Oxford, England. His parents' house was in north London, but during the second world war, 
		     Oxford was considered a safer place to have babies. When he was eight, his family moved 
		     to St. Albans, a town about 20 miles north of London. At the age of eleven, Stephen went 
		     to St. Albans School and then on to University College, Oxford; his father's old college. 
		     Stephen wanted to study Mathematics, although his father would have preferred medicine. 
		     Mathematics was not available at University College, so he pursued Physics instead. 
		     After three years and not very much work, he was awarded a first class honours degree 
		     in Natural Science.
           </p>
         </notes>
       </employee>
     </message>
   </data>


Expected result
---------------

.. code:: xml
   :number-lines:
   :name: instance Enumerate

   <data>
     <message>
       <employee>
         <name>John Smelter</name>
         <department>Forestry Department</department>
         <university>Education University</university>
         <address>
           <street>Witham Hall</street>
           <number>100</number>
           <city>London</city>
           <zipcode>1GH 423</zipcode>
         </address>
         <notes>
           <h2>Education</h2>
           <ul>
             <li><strong>2001</strong><br/>
             Ph.D. in Spatial Information Science and Engineering at the University of Maine. </li>
             <li><strong>1997</strong><br/>
             Master's of Public Administration and Computer Science
             from the Government School of the Joao Pinheiro Foundation, Minas Gerais, Brazil. </li>
             <li><strong>1978</strong><br/>
             B.S. in Mechanical Engineering from the Catholic University of Minas Gerais, Brazil. </li>
             <li><strong>1977</strong><br/>
             Advanced Degree in Data Processing Technology from the
             Federal University of Minas Gerais, Brazil. </li>
           </ul>
         </notes>
       </employee>
       <employee>
         <name>John Smith</name>
         <department>Foreign Department</department>
         <university>Foreign University</university>
         <address>
           <street>Williams Hall</street>
           <number>111</number>
           <city>Washington DC</city>
           <zipcode>20001-111</zipcode>
         </address>
         <notes>
           <TABLE BORDER="0" CELLPADDING="0" CELLSPACING="0">
             <TR VALIGN="TOP">
               <TH colspan="2" align="left">1. Education</TH>
             </TR>
             <TR VALIGN="TOP">
               <TD colspan="2" align="left">Catholic University of Leuven, Belgium</TD>
               <TD>Dr. Sc. (MATH)</TD>
               <TD>1979</TD>
             </TR>
             <TR VALIGN="TOP">
               <TD colspan="2" align="left">University of Antwerp, Belgium</TD>
               <TD>'Licentiaat' in Mathematics</TD>
               <TD>1975</TD>
             </TR>
           </TABLE>      
         </notes>
       </employee>
       <employee>
         <name>Stephen Hawking</name>
         <department>Astronomy Department</department>
         <university>University of Cambridge</university>
         <address>
           <street>The Old Schools, Trinity Ln</street>
           <city>Cambridge</city>
           <zipcode>CB2 1TN</zipcode>
         </address>
         <notes>
           <p>
		     Stephen William Hawking was born on 8 January 1942 (300 years after the death of Galileo) 
		     in Oxford, England. His parents' house was in north London, but during the second world war, 
		     Oxford was considered a safer place to have babies. When he was eight, his family moved 
		     to St. Albans, a town about 20 miles north of London. At the age of eleven, Stephen went 
		     to St. Albans School and then on to University College, Oxford; his father's old college. 
		     Stephen wanted to study Mathematics, although his father would have preferred medicine. 
		     Mathematics was not available at University College, so he pursued Physics instead. 
		     After three years and not very much work, he was awarded a first class honours degree 
		     in Natural Science.
           </p>
         </notes>
       </employee>
     </message>
   </data>


Data template
-------------

.. code:: xml
   :number-lines:
   :name: template Enumerate

   <data>
     <message>
       <employee>
         <name>?</name>
         <department>?</department>
         <university>?</university>
         <address>
           <street>?</street>
           <number>?</number>
           <city>?</city>
           <zipcode>?</zipcode>
         </address>
         <notes>?</notes>
       </employee>
     </message>
   </data>


Transformation
--------------

.. code:: xml
   :number-lines:
   :name: transformation Enumerate

   <tdt:transformation xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt" version="1.0">
     <tdt:rule path="/">
       <tdt:value key="recurse">.</tdt:value>
     </tdt:rule>
     <tdt:rule path="/data/message/employee/notes">
       <tdt:value key=".">notes</tdt:value>
       <tdt:value key="clone">*</tdt:value>
     </tdt:rule>
   </tdt:transformation>


