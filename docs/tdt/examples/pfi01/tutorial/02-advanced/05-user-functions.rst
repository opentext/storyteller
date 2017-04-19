===================
05 - User Functions
===================

:Author: Petr Filipsky

Overview
========

This part of the tutorial demonstrates a future extension of the TDT framework.

With this extension it is possible for users to define their own functions.

The user defined functions are registeres in the ``usr`` namespace and are 
available in any other *rule* or *user function*.

As visible in this usecase it is possible to define even recursive functions.


Test case definition
====================


Transformation
--------------

We can see four user functions defined in this example:

- ``if1`` ... one possibility how to define user based ``if``
- ``if2`` ... another possibility to define ``if``
- ``factorial`` ... recursive function computing factorial of N
- ``fibonacci`` ... recursive function computing N-th fibonacci number

Note that the ``if`` constructs are just ordinary functions - it means that both their 
arguments ``true`` and ``false`` are evaluated regardless the ``condition`` result, 
only one of them is returned.

In order to be able to stop the recursion - we have to use the ``tdt:eval()`` function
(we use ``usr:if`` to pick the proper expression string and evaluate just the result).

.. code:: xml
   :number-lines:
   :name: transformation pfi01/tutorial/02-advanced/05-user-functions

   <tdt:transformation version="1.0" 
         xmlns:tdt="http://developer.opentext.com/schemas/storyteller/transformation/tdt"
		 xmlns:usr="http://developer.opentext.com/schemas/storyteller/transformation/usr">

     <!-- encapsulating two known hacks to implement *if* statement (both branches are evaluated!) -->
    <tdt:rule path="usr:if1">
       <tdt:value key="$condition"/>
       <tdt:value key="$true"/>
       <tdt:value key="$false">'tdt:nodeset()'</tdt:value>
       <tdt:value key="return">tdt:nodeset( $true, $false )[2-$condition]</tdt:value>
     </tdt:rule>

     <tdt:rule path="usr:if2">
       <tdt:value key="$condition"/>
       <tdt:value key="$true"/>
       <tdt:value key="$false">''</tdt:value>
       <tdt:value key="return">
       concat( 
           substring( $true, 1, number( $condition ) * string-length( $true ) ),
           substring( $false, 1, number( not( $condition ) ) * string-length( $false ) ) 
           )
       </tdt:value>
     </tdt:rule>

     <!-- implementing recursive functions -->
     <tdt:rule path="usr:factorial">
       <tdt:value key="$n"/>
       <tdt:value key="return">
         tdt:eval( usr:if1( $n &gt; 1, 'usr:factorial( $n - 1 )', '1' ) ) * $n
       </tdt:value>
     </tdt:rule>
     <tdt:rule path="usr:fibonacci">
       <tdt:value key="$n"/>
       <tdt:value key="return">
         tdt:eval( usr:if2( $n &gt; 2, 'usr:fibonacci( $n - 1 ) + usr:fibonacci( $n - 2 )', '1' ) )
       </tdt:value>
     </tdt:rule>

     <tdt:rule path="/data/factorial">
       <tdt:value key="text()">usr:factorial(7)</tdt:value>
     </tdt:rule>
     <tdt:rule path="/data/fibonacci">
       <tdt:value key="text()">usr:fibonacci(16)</tdt:value>
     </tdt:rule>
   </tdt:transformation>
    


Data Template
-------------

*Data Template* is fairly simple - it just contains placeholder for the two function call results:

.. code:: xml
   :number-lines:
   :name: template pfi01/tutorial/02-advanced/05-user-functions

   <data>
	 <factorial>?</factorial>
	 <fibonacci>?</fibonacci>
    </data>



Expected result
---------------

The result data just contain the results:

- ``factorial(7) == 5040``
- ``fibonacci(16) == 987``

.. code:: xml
   :number-lines:
   :name: instance pfi01/tutorial/02-advanced/05-user-functions

   <data>
	 <factorial>5040</factorial>
	 <fibonacci>987</fibonacci>
   </data>



Source data
-----------

No source data are used in this usecase. 

.. code:: xml
   :number-lines:
   :name: source pfi01/tutorial/02-advanced/05-user-functions

   <data/>




